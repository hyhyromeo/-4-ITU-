import { Knex } from "knex"

export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable("users", (table) => {
    table.dropColumn("qr_code")
    table.dropColumn("roles")
    table.dropColumn("agent_id")
    table.boolean("is_agent")
    table.boolean("is_admin")
  })
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable("users", (table) => {
    table.string("qr_code")
    table.enu("roles", ["user", "admin"])
    table.integer("agent_id").unsigned()
    table.dropColumn("is_agent")
    table.dropColumn("is_admin")
  })
}
