const express = require('express');
const router = express.Router();
const CryptoStats = require('../config/db');

// Endpoint to get the latest price, market cap, and 24h change for a given coin
router.get('/stats', async function(req, res) {
    var coinName = req.query.coin;
    coinName = coinName.trim().toLowerCase();  // Normalize coin name (trim & lowercase)

    if (!coinName) {
        // Validate query parameter presence
        res.status(400).json({ error: "Missing 'coin' query parameter" });
        return;
    }

    try {
        // Fetch the latest record for the specified coin from MongoDB
        var result = await CryptoStats.findOne({ coin: coinName }).sort({ timestamp: -1 }).lean();

        if (result) {
            // Return the latest price stats if found
            res.json({
                price: result.price,
                marketCap: result.marketCap,
                "24hChange": result.change24h
            });
        } else {
            // Handle case when no data found for the coin
            res.status(404).json({ error: "No data found for coin: " + coinName });
        }

    } catch (error) {
        // Handle server-side errors
        res.status(500).json({ error: "Server error: " + error.message });
    }
});

module.exports = router;
