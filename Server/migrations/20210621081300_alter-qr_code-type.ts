import { Knex } from "knex"

export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable("qr_code", (table) => {
    table.string("root").alter()
  })
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable("qr_code", (table) => {
    table.integer("root").alter()
  })
}
