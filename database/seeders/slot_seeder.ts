import Slot from '../../app/models/slot.js'
import { BaseSeeder } from '@adonisjs/lucid/seeders'
import { DateTime } from 'luxon'

const getTime = ({ day, hour, minute }: { day?: number; hour?: number; minute?: number }) =>
  DateTime.fromObject({ day, hour, minute }).toSQL()!

export default class extends BaseSeeder {
  environment = ['development']

  async run() {
    await Slot.updateOrCreateMany(
      ['instituteId', 'userId', 'startTime'],
      [
        {
          instituteId: 1,
          userId: 1,
          computerNumber: 1,
          startTime: getTime({ day: 14, hour: 18, minute: 0 }), // 6pm
          endTime: getTime({ day: 1, hour: 18, minute: 30 }), // 6:30pm
        },
        {
          instituteId: 1,
          userId: 2,
          computerNumber: 1,
          startTime: getTime({ hour: 11, minute: 30 }), // 11:30am
          endTime: getTime({ hour: 12, minute: 0 }), // 12pm
        },
        {
          instituteId: 1,
          userId: 3,
          computerNumber: 1,
          startTime: getTime({ hour: 12, minute: 0 }), // 12pm
          endTime: getTime({ hour: 12, minute: 30 }), // 12:30pm
        },
        {
          instituteId: 1,
          userId: 4,
          computerNumber: 1,
          startTime: getTime({ hour: 14, minute: 0 }), // 2pm
          endTime: getTime({ hour: 14, minute: 30 }), // 2:30pm
        },
        {
          instituteId: 1,
          userId: 5,
          computerNumber: 3,
          startTime: getTime({ hour: 11, minute: 0 }), // 11am
          endTime: getTime({ hour: 11, minute: 30 }), // 11:30am
        },
        {
          instituteId: 1,
          userId: 6,
          computerNumber: 3,
          startTime: getTime({ hour: 15, minute: 0 }), // 3pm
          endTime: getTime({ hour: 15, minute: 30 }), // 3:30pm
        },
      ]
    )
  }
}
