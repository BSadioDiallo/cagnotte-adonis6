import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'transactions'

  async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.integer('student_id').unsigned().notNullable()
      table.foreign('student_id').references('students.id').onDelete('CASCADE').onUpdate('CASCADE')
      table.string('student_matricule').notNullable()
      table
        .foreign('student_matricule')
        .references('students.matricule')
        .onDelete('CASCADE')
        .onUpdate('CASCADE')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
