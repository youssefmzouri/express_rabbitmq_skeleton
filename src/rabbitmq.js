import amqp from 'amqplib/callback_api.js'

const MAIN_QUEUE = 'main'

class RabbitMqProvider {
    static #instance = null
    connection = null
    channel = null

    constructor() {
        if (RabbitMqProvider.#instance) {
            return RabbitMqProvider.#instance
        }

        RabbitMqProvider.#instance = this
        return this
    }

    async connect() {
        return new Promise((resolve, reject) => {
            amqp.connect('amqp://localhost', (error, connection) => {
                if (error) {
                    reject(error)
                } else {
                    this.connection = connection
                    this.connection.createChannel((error, channel) => {
                        if (error) {
                            reject(error)
                        } else {
                            this.channel = channel
                            this.channel.assertQueue(MAIN_QUEUE, { durable: false });
                            resolve()
                        }
                    })
                }
            })
        })
    }

    async consume(queue, callback) {
        if (!this.channel) {
            throw new Error('RabbitMQ channel not created')
        }
        this.channel.consume(queue, callback, { noAck: true });
    }

    publish(queue, msg) {
        if (!this.channel) {
            throw new Error('RabbitMQ channel not created')
        }
        this.channel.sendToQueue(queue, Buffer.from(msg));
    }

    close() {
        if (!this.connection) {
            throw new Error('RabbitMQ connection not created')
        }
        this.connection.close()
    }
}

export {
    RabbitMqProvider,
    MAIN_QUEUE
}