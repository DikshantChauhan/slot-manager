import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'slots'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('institute_id').references('institutes.id')
      table.integer('user_id').references('users.id')
      table.integer('computer_number').notNullable()
      table.dateTime('start_time').notNullable()
      table.dateTime('end_time').notNullable()
      table.unique(['institute_id', 'computer_number', 'start_time'])
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
