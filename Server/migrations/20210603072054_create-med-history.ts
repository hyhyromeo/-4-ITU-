import { Knex } from "knex"

export async function up(knex: Knex): Promise<void> {
  if (!(await knex.schema.hasTable("medical_history"))) {
    await knex.schema.createTable("medical_history", (table) => {
      table.increments()
      table.integer("user_id").unsigned().references("users.id")
      table
        .integer("medical_services_id")
        .unsigned()
        .references("medical_services.id")
      table.date("service_at_date")
      table.timestamps(false, true)
    })
  }
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists("medical_history")
}
