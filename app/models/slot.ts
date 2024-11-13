import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column, afterDelete } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Institute from './institute.js'
import User from './user.js'

export default class Slot extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare instituteId: number

  @column()
  declare userId: number

  // minutes passed since midnight
  @column()
  declare startTime: number

  // minutes passed since midnight
  @column()
  declare endTime: number

  @column()
  declare computerNumber: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime | null

  @belongsTo(() => Institute)
  declare institute: BelongsTo<typeof Institute>

  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>

  // delete entry after endtime passed
  @afterDelete()
  static async deleteAfterEndTimePassed(slot: Slot) {
    if (slot.endTime < new Date().getTime()) {
      await slot.delete()
    }
  }
}
