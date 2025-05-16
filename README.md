#  KoinX Assignment — Backend System (API Server + Worker Server)

This project is a **full backend system** built for the KoinX assignment.  
It involves:
- Fetching cryptocurrency statistics from **CoinGecko API**.
- Storing data in **MongoDB Atlas**.
- Managing background jobs & inter-server communication using **RabbitMQ (via Docker)**.
- Exposing APIs to retrieve latest stats and standard deviation data.

---

##  Project Components

### 1. API Server (`/api-server`)
- Listens for events from RabbitMQ.
- Fetches and stores crypto stats in MongoDB.
- Provides REST APIs:
  - `/cryptostats/stats` → latest stats.
  - `/centraltendency/deviation` → standard deviation.

### 2. Worker Server (`/worker-server`)
- Runs a background job every **15 minutes**.
- Publishes update events to RabbitMQ queue.
- Triggers API server to fetch fresh crypto data.

---

## ✅ Assignment Completion
- ✔️ Working `/stats` and `/deviation` APIs as required.
- ✔️ Background job running every 15 mins.
- ✔️ Inter-server communication via RabbitMQ event queue.
- ✔️ Data persisted in MongoDB Atlas.
- ✔️ Clean code structure & proper documentation.

---

##  Further Details
For detailed setup & API usage, refer:
- [API Server README](./api-server/README.md)
- [Worker Server README](./worker-server/README.md)
