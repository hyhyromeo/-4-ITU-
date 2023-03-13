import { Knex } from "knex"

export async function up(knex: Knex): Promise<void> {
  if (await knex.schema.hasTable("users")) {
    await knex.schema.alterTable("users", (table) => {
      table.dropColumn("membership_no")
    })
  }
}

export async function down(knex: Knex): Promise<void> {
  if (await knex.schema.hasTable("users")) {
    await knex.schema.alterTable("users", (table) => {
        table.string("membership_no", 10)
    })
  }
}
