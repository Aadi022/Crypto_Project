const axios = require('axios');
const CryptoStats = require('../config/db');
require('dotenv').config();

async function storeCryptoStats() {
    var coins = ['bitcoin', 'ethereum', 'matic-network'];

    try {
        var response = await axios.get('https://api.coingecko.com/api/v3/simple/price', {
            params: {
                ids: coins.join(','),
                vs_currencies: 'usd',
                include_market_cap: 'true',
                include_24hr_change: 'true'
            },
            headers: {
                'x-cg-pro-api-key': process.env.API_KEY,
                'x-cg-pro-api-label': process.env.API_LABEL
            }
        });

        var data = response.data;

        for (var i = 0; i < coins.length; i++) {
            var coin = coins[i];
            var price = null;
            var marketCap = null;
            var change24h = null;

            if (data[coin] && data[coin].usd !== undefined) {
                price = data[coin].usd;
            }

            if (data[coin] && data[coin].usd_market_cap !== undefined) {
                marketCap = data[coin].usd_market_cap;
            }

            if (data[coin] && data[coin].usd_24h_change !== undefined) {
                change24h = data[coin].usd_24h_change;
            }

            if (price !== null && marketCap !== null && change24h !== null) {
                try {
                    await CryptoStats.collection.insertOne({
                        coin: coin,
                        price: price,
                        marketCap: marketCap,
                        change24h: change24h,
                        timestamp: new Date()
                    });
                    console.log("Inserted " + coin + " data successfully.");
                } catch (insertError) {
                    console.log("Error inserting " + coin + " data:", insertError.message);
                }

            } else {
                console.log("Data for " + coin + " is incomplete or missing.");
            }
        }

    } catch (error) {
        console.log("Error fetching data from CoinGecko:", error.message);
    }
}


module.exports = storeCryptoStats;
