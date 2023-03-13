import { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  await knex.schema.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"')
  return knex.schema.alterTable('users', (table) => {
    table.uuid('membership_no').unique().notNullable().defaultTo(knex.raw('uuid_generate_v4()'))
  })
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable('users', (table) => {
    table.dropColumn('membership_no')
  })
}
