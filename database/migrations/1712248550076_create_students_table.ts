import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'students'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('matricule', 12).unique().notNullable()
      table.string('email', 254).notNullable().unique()
      table.string('firstname', 80).notNullable()
      table.string('lastname', 80).notNullable()
      table.decimal('contribution', 9, 2).notNullable().defaultTo(0)
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
