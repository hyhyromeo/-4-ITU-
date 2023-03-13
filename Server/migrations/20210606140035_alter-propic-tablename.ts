import { Knex } from "knex"

export async function up(knex: Knex): Promise<void> {
  if (await knex.schema.hasTable("users")) {
    await knex.schema.alterTable("users", (table) => {
      table.renameColumn("profile_pic", "icon")
    })
  }
}

export async function down(knex: Knex): Promise<void> {
  if (await knex.schema.hasTable("users")) {
    await knex.schema.alterTable("users", (table) => {
      table.renameColumn("icon", "profile_pic")
    })
  }
}
