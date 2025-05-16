const mongoose= require("mongoose");
require('dotenv').config();
const dburl = process.env.DATABASE_URL;
const cryptoStats_Schema= require("../models/cryptostats.js");

try{
    mongoose.connect(dburl);
    console.log("Successfully connected to the database");
}catch{
    console.log("Could not connect to the database");
}

const cryptostats= mongoose.model("CryptoStats", cryptoStats_Schema);

module.exports= cryptostats;