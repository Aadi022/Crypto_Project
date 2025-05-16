const mongoose= require("mongoose");
require('dotenv').config();
const dburl = process.env.DATABASE_URL;
const cryptoStats_Schema= require("../models/cryptostats.js");

try{
    mongoose.connect(dburl);  //connecting to the database
    console.log("Successfully connected to the database");  //logs on successful communication
}catch{
    console.log("Could not connect to the database");  //logs on unsuccessful communication
}

const cryptostats= mongoose.model("CryptoStats", cryptoStats_Schema);

module.exports= cryptostats;