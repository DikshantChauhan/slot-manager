import Institute from '../../app/models/institute.js'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  environment = ['development']
  async run() {
    await Institute.updateOrCreateMany(
      ['name'],
      [
        {
          name: 'Test Institute',
          computerCount: 10,
          openingTime: 600, // 10am
          closingTime: 1020, // 5pm
        },
        {
          name: 'Test Institute 2',
          computerCount: 10,
          openingTime: 540, // 9am
          closingTime: 780, // 2pm
        },
      ]
    )
  }
}
