import { Knex } from "knex"

export async function up(knex: Knex): Promise<void> {
  if (!(await knex.schema.hasTable("medical_services"))) {
    await knex.schema.createTable("medical_services", (table) => {
      table.increments()
      table.string("service").notNullable()
      table.integer("point")
      table.integer("price")
      table.text("description")
      table
        .integer("medical_center_id")
        .unsigned()
        .references("medical_center.id")
      table.integer("doctor_id").unsigned().references("doctors.id")
      table.enu("status", ["active", "inactive"]).defaultTo("active")
      table.timestamps(false, true)
    })
  }
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists("medical_services")
}
