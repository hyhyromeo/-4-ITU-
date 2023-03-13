import { config } from 'dotenv'
import Knex from 'knex'
config()

let mode = process.env.NODE_ENV || 'development'
let configs = require('./knex-config')

export let knex = Knex(configs[mode])
