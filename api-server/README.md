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

* *   The **worker-server** publishes `{ "trigger": "update" }` to the `CRYPTO_STATS_UPDATE` queue every 15 minutes.
*     
* *   The **api-server** listens to this queue.
*     
* *   On event reception, it triggers `storeCryptoStats()`, which:
*     
*     * *   Calls CoinGecko API.
*     *     
*     * *   Stores data in MongoDB Atlas.
*     *     
* *   Exposes APIs to fetch latest stats and deviation.
*     

* * *

## 📡 API Endpoints

### 1\. `/cryptostats/stats`

* *   **Method**: GET
*     
* *   **Query Param**: `coin` (bitcoin | ethereum | matic-network)
*     
* *   **Example**:
*     
*     ```
*     http://localhost:3000/cryptostats/stats?coin=bitcoin
*     ```
*     
* *   **Response**:
*     


{
  "price": 40000,
  "marketCap": 800000000,
  "24hChange": 3.4
}


* * *

### 2\. `/centraltendency/deviation`

* *   **Method**: GET
*     
* *   **Query Param**: `coin` (bitcoin | ethereum | matic-network)
*     
* *   **Example**:
*     
*     ```
*     http://localhost:3000/centraltendency/deviation?coin=bitcoin
*     ```
*     
* *   **Response**:
*     

```json
{
  "deviation": 4082.48
}
```

* * *

## ✅ Assignment Success Criteria Covered

* *   ✅ Working `/stats` API to fetch latest data.
*     
* *   ✅ Working `/deviation` API for standard deviation of prices.
*     
* *   ✅ Background job triggers via RabbitMQ (every 15 mins).
*     
* *   ✅ MongoDB Atlas schema structured for crypto stats.
*     
* *   ✅ Proper folder structure & modular code.
*     
* *   ✅ Documentation (this README).
*     

* * *

## ✅ Notes

* *   RabbitMQ used as the event queue (NATS alternative).
*     
* *   MongoDB Atlas is used as cloud database.
*     
* *   CoinGecko API provides live crypto stats.
*     
* *   Environment variables are used for sensitive configs.
*     
* *   .env is ignored in .gitignore for security.
*     

* * *