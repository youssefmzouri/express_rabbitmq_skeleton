import amqp from 'amqplib/callback_api.js'

const MAIN_QUEUE = 'main'
let rabbitConnection = null

const createChannelCallback = (err, channel) => {
    if (err) {
        throw err
    }
    channel.assertQueue(MAIN_QUEUE, {
        durable: false
    })
    console.log("[RabbitMQ] - Main queue created")

    // TODO - CONSUME MESSAGES 
}

// connect to rabbitmq
amqp.connect(process.env.URI_RABBIT, (err, conn) => {
    if (err) {
        throw err
    }
    rabbitConnection = conn
    rabbitConnection.createChannel(createChannelCallback)
})

export { amqp, rabbitConnection }