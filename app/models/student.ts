import { DateTime } from 'luxon'
import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import Transaction from '#models/transaction'
import type { HasMany } from '@adonisjs/lucid/types/relations'

export default class Student extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare matricule: string

  @column()
  declare email: string

  @column()
  declare firstname: string

  @column()
  declare lastname: string

  @column()
  declare contribution: number

  @hasMany(() => Transaction)
  declare transactions: HasMany<typeof Transaction>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
