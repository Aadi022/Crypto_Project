const express= require("express");
const app= express();
const cors= require("cors");
const bodyparser= require("body-parser");
require('dotenv').config();
const mainroute= require("./routes/routes.js");
const connectToRabbitMQ= require("./helper/consumer.js");
const port = process.env.PORT;

connectToRabbitMQ();  //Handling the event queue

app.use(cors());
app.use(bodyparser.json());
app.use(mainroute);  //Routing for both the APIs

app.listen(port,function(){
    console.log("The server is running on port ",port);
});
