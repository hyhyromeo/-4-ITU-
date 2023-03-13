import { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  if (!(await knex.schema.hasTable('newsAndPromotion'))) {
    await knex.schema.createTable('newsAndPromotion', (table) => {
      table.increments()
      table.string('image', 2048)
      table.text('title')
      table.text('description')
      table.enu('status', ['active', 'inactive']).defaultTo('active')
      table.timestamps(false, true)
    })
  }
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('newsAndPromotion')
}
