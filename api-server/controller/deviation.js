const express = require('express');
const router = express.Router();
const CryptoStats = require('../config/db');

router.get('/deviation', async function(req, res) {
    var coinName = req.query.coin;

    if (!coinName) {
        res.status(400).json({ error: "Missing 'coin' query parameter" });
        return;
    }

    try {
        coinName = coinName.trim();

        var records = await CryptoStats.find({ coin: coinName })
                                       .sort({ timestamp: -1 })
                                       .limit(100)
                                       .lean();

        if (!records || records.length === 0) {
            res.status(404).json({ error: "No data found for coin: " + coinName });
            return;
        }

        var prices = [];
        for (var i = 0; i < records.length; i++) {
            prices.push(records[i].price);
        }

        var sum = 0;
        for (var j = 0; j < prices.length; j++) {
            sum = sum + prices[j];
        }

        var mean = sum / prices.length;

        var varianceSum = 0;
        for (var k = 0; k < prices.length; k++) {
            varianceSum = varianceSum + Math.pow(prices[k] - mean, 2);
        }

        var variance = varianceSum / prices.length;
        var standardDeviation = Math.sqrt(variance);

        res.json({
            deviation: parseFloat(standardDeviation.toFixed(2))
        });

    } catch (error) {
        res.status(500).json({ error: "Server error: " + error.message });
    }
});

module.exports = router;
