import { Knex } from "knex"

export async function up(knex: Knex): Promise<void> {
  if (!(await knex.schema.hasTable("gifts_history"))) {
    await knex.schema.createTable("gifts_history", (table) => {
      table.increments()
      table.integer("user_id").unsigned().references("users.id")
      table.integer("gift_item_id").unsigned().references("gifts.id")
      table.integer("cost_at_date")
      table.date("claim_date")
      table.date("expiry_date")
      table.timestamps(false, true)
    })
  }
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists("gifts_history")
}
