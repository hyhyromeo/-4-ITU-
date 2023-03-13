import { config } from 'dotenv'

config()

if (!process.env.JWT_SECRET) {
  console.error('Error: missing JWT_SECRET in env!')
}

export default {
  jwtSecret: process.env.JWT_SECRET!,
  jwtSession: {
    session: false,
  },
}
