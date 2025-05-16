# 🚀 KoinX Assignment — Worker Server

This repository contains the **Worker Server** component of the KoinX assignment.

It is responsible for:

 *   Publishing trigger events to update cryptocurrency statistics.
     
 *   Sending `{ "trigger": "update" }` messages to the `CRYPTO_STATS_UPDATE` queue.
     
 *   This triggers the **API Server** to fetch and store the latest crypto stats.
     

* * *

##  Tech Stack

 *   Node.js (Express.js)
     
 *   RabbitMQ (via Docker)
     
 *   amqplib (RabbitMQ client)
     

* * *

## 🗂 Project Structure


`worker-server/ ├── server.js              # Entry point of the worker-server ├── package.json           # Project dependencies & metadata ├── package-lock.json      # Exact dependency versions └── README.md              # This file`

* * *

## 🛠 Setup Instructions

### 1\. Clone the repository



`git clone <your-repo-url> cd worker-server`

### 2\. Install dependencies



`npm install`

### 3\. Configure environment variables

Create a `.env` file in root:


`RABBITMQ_URL=amqp://localhost QUEUE_NAME=CRYPTO_STATS_UPDATE`

### 4\. Start RabbitMQ using Docker


`docker run -d --hostname rabbitmq-local --name rabbitmq -p 5672:5672 -p 15672:15672 rabbitmq:3-management`

Access RabbitMQ UI: [http://localhost:15672](http://localhost:15672/)  
(Default login: guest / guest)

### 5\. Start the Worker Server


`npm start`

Expected logs:


`Connected to RabbitMQ Message published to CRYPTO_STATS_UPDATE queue`

* * *

##  How It Works

 *   The **worker-server** connects to RabbitMQ.
     
 *   Publishes the following message to the `CRYPTO_STATS_UPDATE` queue:
     
 *     json
     
 *     CopyEdit
     
 *     `{ "trigger": "update" }`
  
 *   The **API Server** subscribes to this queue and fetches fresh crypto stats from CoinGecko.
   

* * *

##  Assignment Success Criteria

 *    Publishes a message to RabbitMQ.
     
 *    Minimal clean folder structure.
     
 *    Environment variables for config.
     
 *    Documentation (this README).
     

* * *

##  Notes

 *   RabbitMQ is used as the event queue (NATS alternative).
     
 *   Trigger message is published manually or as part of a broader system.
     
 *   Environment variables manage sensitive configs.
