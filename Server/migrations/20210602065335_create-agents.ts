import { Knex } from "knex"

export async function up(knex: Knex): Promise<void> {
  if (!(await knex.schema.hasTable("agents"))) {
    await knex.schema.createTable("agents", (table) => {
      table.increments()
      table.string("first_name", 25)
      table.string("last_name", 25)
      table.string("membership_no", 10)
      table.timestamps(false, true)
    })
  }
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists("agents")
}
