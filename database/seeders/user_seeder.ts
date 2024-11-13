import User from '../../app/models/user.js'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  environment = ['development']

  async run() {
    await User.updateOrCreateMany(
      ['email'],
      [
        {
          fullName: 'Student User',
          email: 'student@test.com',
          password: 'password',
          role: 'student',
          instituteId: 1,
        },
        {
          fullName: 'Student User 2',
          email: 'student2@test.com',
          password: 'password',
          role: 'student',
          instituteId: 1,
        },
        {
          fullName: 'Student User 3',
          email: 'student3@test.com',
          password: 'password',
          role: 'student',
          instituteId: 1,
        },
        {
          fullName: 'Student User 4',
          email: 'student4@test.com',
          password: 'password',
          role: 'student',
          instituteId: 1,
        },
        {
          fullName: 'Student User 5',
          email: 'student5@test.com',
          password: 'password',
          role: 'student',
          instituteId: 1,
        },
        {
          fullName: 'Student User 6',
          email: 'student6@test.com',
          password: 'password',
          role: 'student',
          instituteId: 1,
        },
        {
          fullName: 'Student User 7',
          email: 'student7@test.com',
          password: 'password',
          role: 'student',
          instituteId: 2,
        },
        {
          fullName: 'Admin User',
          email: 'admin@test.com',
          password: 'password',
          role: 'admin',
          instituteId: 1,
        },
        {
          fullName: 'Admin User 2',
          email: 'admin2@test.com',
          password: 'password',
          role: 'admin',
          instituteId: 1,
        },
        {
          fullName: 'Admin User 3',
          email: 'admin3@test.com',
          password: 'password',
          role: 'admin',
          instituteId: 2,
        },
        {
          fullName: 'Admin User 4',
          email: 'admin4@test.com',
          password: 'password',
          role: 'admin',
          instituteId: 2,
        },
      ]
    )
  }
}
