import { Knex } from "knex"

export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable("gifts", (table) => {
    table.integer("created_by")
    table.integer("edited_by")
  })
  await knex.schema.alterTable("gifts_history", (table) => {
    table.integer("created_by")
    table.integer("edited_by")
  })
  await knex.schema.alterTable("medical_services", (table) => {
    table.integer("created_by")
    table.integer("edited_by")
  })
  await knex.schema.alterTable("point_record", (table) => {
    table.integer("created_by").alter()
    table.integer("edited_by")
  })
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable("gifts", (table) => {
    table.dropColumn("created_by")
    table.dropColumn("edited_by")
  })
  await knex.schema.alterTable("gifts_history", (table) => {
    table.dropColumn("created_by")
    table.dropColumn("edited_by")
  })
  await knex.schema.alterTable("medical_services", (table) => {
    table.dropColumn("created_by")
    table.dropColumn("edited_by")
  })
  await knex.schema.alterTable("point_record", (table) => {
    table.string("created_by").alter()
    table.dropColumn("edited_by")
  })
}
