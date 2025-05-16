const express= require("express");
const app= express();
const cors= require("cors");
const bodyparser= require("body-parser");
require('dotenv').config();
const port = process.env.PORT;
const amqp = require("amqplib");

let channel, connection;

async function connect() {
    try {
        const amqpServer = "amqp://localhost:5672";
        connection = await amqp.connect(amqpServer);
        channel = await connection.createChannel();
        await channel.assertQueue("CRYPTO_STATS_UPDATE");
        console.log("Worker connected to RabbitMQ");
    } catch (err) {
        console.log("Could not connect to RabbitMQ", err);
    }
}

async function publishEvent() {
    const message = { trigger: "update" };
    channel.sendToQueue("CRYPTO_STATS_UPDATE", Buffer.from(JSON.stringify(message)));
    console.log("Published event to CRYPTO_STATS_UPDATE queue");
}

async function startWorker() {
    await connect();

    // Publish every 15 mins (15 * 60 * 1000 ms)
    setInterval(function() {
        publishEvent();
    }, 15 * 60 * 1000);

    // For testing, publish once immediately:
    publishEvent();
}

startWorker();



app.listen(port,function(){
    console.log("The server is running on port ",port);
})