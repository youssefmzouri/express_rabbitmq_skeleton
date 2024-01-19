import { config } from 'dotenv'

const envPath = process.env.ENVIRONMENT === 'dev' ? '.env.dev' : '.env'
config({ path: envPath })

export { }
