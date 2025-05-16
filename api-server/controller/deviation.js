const express = require('express');
const router = express.Router();
const CryptoStats = require('../config/db');

// Endpoint to get standard deviation of last 100 price records for a given coin
router.get('/deviation', async function(req, res) {
    var coinName = req.query.coin;

    if (!coinName) {
        // Validate that coin query parameter is provided
        res.status(400).json({ error: "Missing 'coin' query parameter" });
        return;
    }

    try {
        coinName = coinName.trim();

        // Fetch the latest 100 records for the specified coin from MongoDB
        var records = await CryptoStats.find({ coin: coinName })
                                       .sort({ timestamp: -1 })
                                       .limit(100)
                                       .lean();

        if (!records || records.length === 0) {
            // If no records found, return 404
            res.status(404).json({ error: "No data found for coin: " + coinName });
            return;
        }

        // Extract prices from fetched records
        var prices = [];
        for (var i = 0; i < records.length; i++) {
            prices.push(records[i].price);
        }

        // Calculate mean of prices
        var sum = 0;
        for (var j = 0; j < prices.length; j++) {
            sum = sum + prices[j];
        }

        var mean = sum / prices.length;

        // Calculate variance (sum of squared differences)
        var varianceSum = 0;
        for (var k = 0; k < prices.length; k++) {
            varianceSum = varianceSum + Math.pow(prices[k] - mean, 2);
        }

        var variance = varianceSum / prices.length;
        var standardDeviation = Math.sqrt(variance);

        // Return the calculated standard deviation
        res.json({
            deviation: parseFloat(standardDeviation.toFixed(2))
        });

    } catch (error) {
        // Handle any unexpected server errors
        res.status(500).json({ error: "Server error: " + error.message });
    }
});

module.exports = router;
