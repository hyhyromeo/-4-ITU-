import { Knex } from "knex"

export async function up(knex: Knex): Promise<void> {
  if (!(await knex.schema.hasTable("medical_center"))) {
    await knex.schema.createTable("medical_center", (table) => {
      table.increments()
      table.string("center").notNullable()
      table.timestamps(false, true)
    })
  }
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists("medical_center")
}
