import { Knex } from "knex"

export async function up(knex: Knex): Promise<void> {
  if (!(await knex.schema.hasTable("gifts"))) {
    await knex.schema.createTable("gifts", (table) => {
      table.increments()
      table.string("gift_item").notNullable()
      table.text("description")
      table.integer("cost")
      table.enu("status", ["active", "inactive"]).defaultTo("active")
      table.timestamps(false, true)
    })
  }
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists("gifts")
}
