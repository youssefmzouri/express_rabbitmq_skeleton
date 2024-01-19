import './loadEnv.js'
import { amqp, rabbitConnection } from './rabbitmq.js'
import express from 'express'
import logger from 'morgan'
import apiRouter from './routes/index.js'
const PORT = process.env.PORT ?? 3000

// App
const app = express()

// Settings
app.disable('x-powered-by')

// Middlewares
app.use(logger('dev'))
app.use(express.json())

// Setting routes
app.use('/api', apiRouter)

// Error handling
app.use((_req, res) => {
  res.status(404).send({ error: 'Not found' })
})

// Server
const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

process.on('exit', () => {
  console.log('Exiting...')

  // disconnect from rabbitmq
  rabbitConnection !== null && rabbitConnection.close()

  server.close()
})

export {
  app,
  server
}
