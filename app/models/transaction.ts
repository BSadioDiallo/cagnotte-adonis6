import Student from '#models/student'
import { DateTime } from 'luxon'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm'

export default class Transaction extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare amount: number

  @column()
  declare studentId: number

  @column()
  declare studentMatricule: string

  @belongsTo(() => Student)
  declare student: BelongsTo<typeof Student>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime
}
