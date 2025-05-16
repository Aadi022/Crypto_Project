# 🚀 KoinX Assignment — API Server

This repository contains the **API Server** component of the KoinX assignment.  
It is responsible for:
- Fetching cryptocurrency statistics from the **CoinGecko API**.
- Storing data in **MongoDB Atlas**.
- Exposing API endpoints to retrieve stats and calculate deviation.
- Subscribing to background job events via **RabbitMQ** (used as NATS alternative).

---

## 📦 Tech Stack
- Node.js (Express.js)
- MongoDB Atlas (Cloud Database)
- RabbitMQ (via Docker)
- CoinGecko API
- amqplib (RabbitMQ client)

---

## 🗂 Project Structure
```

api-server/  
├── controllers/  
│ ├── stats.js # /stats API logic  
│ └── deviation.js # /deviation API logic  
├── helper/  
│ ├── consumer.js # RabbitMQ consumer triggering storeCryptoStats  
│ └── storeCryptoStats.js # Fetch & store crypto stats in MongoDB  
├── models/  
│ └── cryptostats.js # MongoDB schema  
├── config/  
│ └── db.js # MongoDB connection setup  
├── routes/  
│ └── routes.js # API route definitions  
├── .env # Environment variables  
├── server.js # API server entry point  
└── package.json # Dependencies

````

---

## 🛠 Setup Instructions

### 1. Clone the repository
```bash
git clone <your-repo-url>
cd api-server
````

### 2\. Install dependencies

```bash
npm install
```

### 3\. Configure environment variables

Create a `.env` file in root:

```env
PORT=3000
DATABASE_URL=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/
API_KEY=your_coingecko_api_key
API_LABEL=your_coingecko_api_label
```

### 4\. Start RabbitMQ using Docker

```bash
docker run -d --hostname rabbitmq-local --name rabbitmq -p 5672:5672 -p 15672:15672 rabbitmq:3-management
```

Access RabbitMQ UI: [http://localhost:15672](http://localhost:15672/)  
(Default login: guest / guest)

### 5\. Start the API Server

```bash
npm start
```

Expected logs:

```
Successfully connected to the database
The server is running on port 3000
API Server connected to RabbitMQ
```

* * *

## 🧑‍💻 How It Works

 *   The **worker-server** publishes { "trigger": "update" } to the CRYPTO\_STATS\_UPDATE queue every 15 minutes.
 *   The **api-server** subscribes to this queue.
 *   Upon receiving an event, it triggers storeCryptoStats(), which:* *   Calls the CoinGecko API.
     * *   Stores data in MongoDB Atlas.
 *   Exposes APIs to fetch the latest stats and deviation.

## 📡 API Endpoints

### 1\. /cryptostats/stats

 *   **Method**: GET
 *   **Query Param**: coin (bitcoin | ethereum | matic-network)
 *   **Example**: http://localhost:3000/cryptostats/stats?coin=bitcoin
 *   **Response**:
     
     
     `{ "price": 40000, "marketCap": 800000000, "24hChange": 3.4 }`
     

### 2\. /centraltendency/deviation

 *   **Method**: GET
 *   **Query Param**: coin (bitcoin | ethereum | matic-network)
 *   **Example**: http://localhost:3000/centraltendency/deviation?coin=bitcoin
 *   **Response**:
     
     
     `{ "deviation": 4082.48 }`
     

## ✅ Assignment Success Criteria

 *   <input type="checkbox" checked disabled> Working /stats API to fetch latest data.
 *   <input type="checkbox" checked disabled> Working /deviation API for standard deviation of prices.
 *   <input type="checkbox" checked disabled> Background job triggers via RabbitMQ (every 15 minutes).
 *   <input type="checkbox" checked disabled> MongoDB Atlas schema structured for crypto stats.
 *   <input type="checkbox" checked disabled> Proper folder structure and modular code.
 *   <input type="checkbox" checked disabled> Documentation (this README).

## 📝 Notes

 *   RabbitMQ is used as the event queue (NATS alternative).
 *   MongoDB Atlas serves as the cloud database.
 *   CoinGecko API provides live crypto stats.
 *   Environment variables manage sensitive configurations.
 *   .env is excluded in .gitignore for security.

