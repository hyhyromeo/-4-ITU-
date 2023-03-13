import { Knex } from "knex"

export async function up(knex: Knex): Promise<void> {
  if (!(await knex.schema.hasTable("users"))) {
    await knex.schema.createTable("users", (table) => {
      table.increments()
      table.string("first_name", 25)
      table.string("last_name", 25)
      table.string("email", 50).unique()
      table.string("password")
      table.string("membership_no", 10)
      table.string("qr_code")
      table.integer("phone_number")
      table.enu("gender", ["male", "female", "others"])
      table.date("birthday")
      table.text("description")
      table.string("profile_pic")
      table.enu("roles", ["user", "admin"]).defaultTo("user")
      table.integer("agent_id").unsigned().references("agents.id")
      table.timestamps(false, true)
    })
  }
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists("users")
}
