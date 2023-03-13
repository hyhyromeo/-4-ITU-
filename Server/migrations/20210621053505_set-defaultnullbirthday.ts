import { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable('users', (table) => {
      table.string('birthday').defaultTo(null).alter()
  })
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable('users', (table) => {
    table
    .string('birthday')
    .defaultTo(new Date("2021-01-01"))
    .alter()
  })
}
