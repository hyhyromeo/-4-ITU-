require('dotenv').config()

// Update with your config settings.
module.exports = {
  development: {
    client: 'postgresql',
    connection: {
      database: process.env.DEV_DB_NAME,
      user: process.env.DEV_DB_USER,
      password: process.env.DEV_DB_PASS,
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: 'knex_migrations',
    },
  },

  ci: {
    client: "sqlite3",
    connection: {
      filename: "./dev.sqlite3"
    }
  },

  production_bk: {
    client: "sqlite3",
    connection: {
      filename: "./data/prod.sqlite3"
    }
  },

  production: {
    client: 'postgresql',
    connection: {
      database: process.env.PROD_POSTGRES_DB,
      user: process.env.PROD_POSTGRES_USER,
      password: process.env.PROD_POSTGRES_PASSWORD,
      host: process.env.PROD_POSTGRES_HOST,
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: 'knex_migrations',
    },
  },
}
