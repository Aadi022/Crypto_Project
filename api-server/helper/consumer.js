const amqp = require("amqplib");
const storeCryptoStats = require("./storeCryptoStats.js");

var channel, connection;

async function connectToRabbitMQ() {
    try {
        const amqpServer = "amqp://localhost:5672";  // Connect to local RabbitMQ server
        connection = await amqp.connect(amqpServer);
        channel = await connection.createChannel();
        await channel.assertQueue("CRYPTO_STATS_UPDATE");
        console.log("API Server connected to RabbitMQ");

        // Listen for messages and trigger storeCryptoStats on event
        channel.consume("CRYPTO_STATS_UPDATE", async function(data) {
            console.log("Received event from worker-server: ", data.content.toString());
            
            try {
                await storeCryptoStats();
                console.log("storeCryptoStats() triggered successfully");
            } catch (err) {
                console.log("Error in storeCryptoStats:", err.message);
            }

            channel.ack(data);  // Acknowledge message after handling
        });

    } catch (err) {
        console.log("Could not connect to RabbitMQ", err);
    }
}

module.exports = connectToRabbitMQ;
