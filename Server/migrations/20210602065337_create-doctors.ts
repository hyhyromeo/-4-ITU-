import { Knex } from "knex"

export async function up(knex: Knex): Promise<void> {
  if (!(await knex.schema.hasTable("doctors"))) {
    await knex.schema.createTable("doctors", (table) => {
      table.increments()
      table.string("first_name", 25)
      table.string("last_name", 25)
      table.enu("status", ["active", "inactive"])
      table.timestamps(false, true)
    })
  }
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists("doctors")
}
