import type { HttpContext } from '@adonisjs/core/http'
import vine from '@vinejs/vine'

export default class InstitutesController {
  async meInstitute({ response, auth }: HttpContext) {
    const user = auth.getUserOrFail()
    await user.preload('institute')

    response.json(user.institute)
  }

  async update({ request, response, auth }: HttpContext) {
    const { computerCount, openingTime, closingTime } = await request.validateUsing(
      vine.compile(
        vine.object({
          computerCount: vine.number().positive().withoutDecimals(),
          //openingTime => hh:mm
          openingTime: vine.string().regex(/^\d{2}:\d{2}$/),
          //closingTime => hh:mm
          closingTime: vine.string().regex(/^\d{2}:\d{2}$/),
        })
      )
    )

    const openingTimeInMinutes = openingTime.split(':').reduce((acc, curr) => acc * 60 + +curr, 0)
    const closingTimeInMinutes = closingTime.split(':').reduce((acc, curr) => acc * 60 + +curr, 0)

    if (openingTimeInMinutes < 0 || openingTimeInMinutes > 1440) {
      return response.badRequest({ message: 'Invalid opening time' })
    }

    if (closingTimeInMinutes < 0 || closingTimeInMinutes > 1440) {
      return response.badRequest({ message: 'Invalid closing time' })
    }

    if (openingTimeInMinutes >= closingTimeInMinutes) {
      return response.badRequest({ message: 'Opening time must be less than closing time' })
    }

    const admin = auth.getUserOrFail()
    const institute = await admin.related('institute').query().firstOrFail()

    institute.computerCount = computerCount
    institute.openingTime = openingTimeInMinutes
    institute.closingTime = closingTimeInMinutes

    const updatedInstitute = await institute.save()

    return response.json(updatedInstitute)
  }
}
