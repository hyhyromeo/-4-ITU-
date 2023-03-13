import { Knex } from "knex"

export async function up(knex: Knex): Promise<void> {
  if (!(await knex.schema.hasTable("point_record"))) {
    await knex.schema.createTable("point_record", (table) => {
      table.increments()
      table.integer("user_id").unsigned().references("users.id")
      table
        .integer("medical_services_id")
        .unsigned()
        .references("medical_services.id")
      table.integer("points_gained")
      table.date("points_gained_date")
      table.date("points_expiry_date")
      table.string("created_by").notNullable()
      table.timestamps(false, true)
    })
  }
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists("point_record")
}
