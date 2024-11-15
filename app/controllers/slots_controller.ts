import type { HttpContext } from '@adonisjs/core/http'
import vine from '@vinejs/vine'
import { getSQLDateTime } from '../../utils.js'
import Institute from '#models/institute'

const slotDurationInMinutes = 30

export default class SlotsController {
  public async slotsByDate({ request, response, auth }: HttpContext) {
    const { date } = await request.validateUsing(
      vine.compile(
        vine.object({
          //date => mm/dd/yyyy
          date: vine.string().regex(/^\d{2}\/\d{2}\/\d{4}$/),
        })
      )
    )

    const timestamp = new Date(date).getTime()
    const today = getSQLDateTime(timestamp)
    const nextDay = getSQLDateTime(timestamp + 24 * 60 * 60 * 1000)
    console.log({ today, nextDay })
    const log = await Institute.query().where('id', 1).preload('slots')
    console.log(log)

    const user = auth.getUserOrFail()
    const slots = await user
      .related('institute')
      .query()
      .preload('slots', (query) => {
        query.whereBetween('start_time', [today, nextDay]).orderBy('start_time', 'asc')
      })
      .firstOrFail()
      .then((institute) => institute.slots)

    return response.json(slots)
  }

  async meBookedSlots({ response, auth }: HttpContext) {
    const student = auth.getUserOrFail()

    const today = getSQLDateTime(new Date().setHours(0, 0, 0, 0))
    const slots = await student
      .related('slots')
      .query()
      .where('start_time', '>=', today)
      .orderBy('start_time', 'asc')

    return response.json(slots)
  }

  async bookSlot({ request, response, auth }: HttpContext) {
    const { computerNumber, date, time } = await request.validateUsing(
      vine.compile(
        vine.object({
          computerNumber: vine.number(),
          //date => mm/dd/yyyy
          date: vine.string().regex(/^\d{2}\/\d{2}\/\d{4}$/),
          //time => hh:mm
          time: vine.string().regex(/^\d{2}:\d{2}$/),
        })
      )
    )

    //check is time is valid . 10:00, 10:30, 12:00, 2:30 allowed, 11:11 is not allowed
    const getTimeInMinutes = time.split(':')[1]
    if (getTimeInMinutes !== '00' && getTimeInMinutes !== '30') {
      return response.badRequest({
        message: `Invalid time field. ${getTimeInMinutes}mins is not allowed. Only 00 and 30 minutes are allowed`,
      })
    }

    const student = auth.getUserOrFail()

    const startDate = new Date(`${date} ${time}`)
    const startDateTimestamp = startDate.getTime()
    const startTimeInMinutes = startDate.getHours() * 60 + startDate.getMinutes() //minutes passed since midnight
    const endTimeInMinutes = startTimeInMinutes + slotDurationInMinutes

    const isDateValid = !Number.isNaN(startDateTimestamp)
    if (!isDateValid) {
      return response.badRequest({ message: 'Invalid date' })
    }

    //check is future date
    if (startDateTimestamp < Date.now()) {
      return response.badRequest({ message: 'Invalid date, date must be future date' })
    }

    //check if timing valid for institute timings
    const institute = await student.related('institute').query().firstOrFail()
    console.log({
      openingTime: institute.openingTime,
      closingTime: institute.closingTime,
      startTimeInMinutes,
      endTimeInMinutes,
    })
    if (startTimeInMinutes < institute.openingTime && endTimeInMinutes > institute.closingTime) {
      return response.badRequest({ message: 'Pick timings suitable for institute' })
    }

    //check if booking valid computer number
    if (computerNumber > institute.computerCount) {
      return response.badRequest({
        message: `Invalid computer number, institute has only ${institute.computerCount} computers`,
      })
    }

    const sqlStartDate = getSQLDateTime(startDateTimestamp)
    const sqlEndDate = getSQLDateTime(startDateTimestamp + slotDurationInMinutes * 60 * 1000)

    //check if slot already booked or overlapping
    const conflictingSlots = await student
      .related('slots')
      .query()
      .where('start_time', '=', sqlStartDate)
      .andWhere('end_time', '=', sqlEndDate)
      .andWhere('computer_number', computerNumber)
      .first()

    if (conflictingSlots) {
      return response.badRequest({ message: 'Slot already booked' })
    }

    //check if user already has a slot booked for requested date
    const requestedDateTimestamp = new Date(`${date}`).getTime()
    const requestedDate = getSQLDateTime(requestedDateTimestamp)
    const requestedDateEnd = getSQLDateTime(requestedDateTimestamp + 24 * 60 * 60 * 1000)
    const slots = await student
      .related('slots')
      .query()
      .where('start_time', '>=', requestedDate)
      .andWhere('end_time', '<=', requestedDateEnd)
      .first()

    if (slots) {
      return response.badRequest({ message: `User already has a slot booked for ${date}` })
    }

    //create slot
    const slot = await student.related('slots').create({
      computerNumber,
      startTime: sqlStartDate,
      endTime: sqlEndDate,
      instituteId: institute.id,
    })

    return response.json(slot)
  }
}
