import Slot from '../../app/models/slot.js'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

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
          startTime: 660, // 11am
          endTime: 690, // 11:30am
        },
        {
          instituteId: 1,
          userId: 2,
          computerNumber: 1,
          startTime: 690, // 11:30am
          endTime: 720, // 12pm
        },
        {
          instituteId: 1,
          userId: 3,
          computerNumber: 1,
          startTime: 720, // 12pm
          endTime: 750, // 12:30pm
        },
        {
          instituteId: 1,
          userId: 4,
          computerNumber: 1,
          startTime: 780, // 2pm
          endTime: 810, // 2:30pm
        },
        {
          instituteId: 1,
          userId: 5,
          computerNumber: 3,
          startTime: 660, // 11am
          endTime: 690, // 11:30am
        },
        {
          instituteId: 1,
          userId: 6,
          computerNumber: 3,
          startTime: 780, // 3pm
          endTime: 810, // 3:30pm
        },
      ]
    )
  }
}
