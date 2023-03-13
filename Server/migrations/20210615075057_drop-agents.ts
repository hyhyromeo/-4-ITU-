import { Knex } from "knex"

export async function up(knex: Knex): Promise<void> {
  await knex.schema.dropTable("agents")
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.createTable("agents", (table) => {
    table.string("name")
  })
}
