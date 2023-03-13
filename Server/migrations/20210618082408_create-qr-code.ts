import { Knex } from "knex"

export async function up(knex: Knex): Promise<void> {
  if (!(await knex.schema.hasTable("qr_code"))) {
    await knex.schema.createTable("qr_code", (table) => {
      table.increments()
      table.integer("user_id").unsigned().references("users.id")

      table.integer("root", 6)
      table.timestamp("expiry_time", { precision: 2 })
      table.timestamps(false, true)
    })
  }
}

export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTableIfExists("qr_code")
}
