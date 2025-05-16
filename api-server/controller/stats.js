const express = require('express');
const router = express.Router();
const CryptoStats = require('../config/db');

router.get('/stats', async function(req, res) {
    var coinName = req.query.coin;
    coinName = coinName.trim().toLowerCase();  //Removes spaces and lower cases
    
    if (!coinName) {
        res.status(400).json({ error: "Missing 'coin' query parameter" });
        return;
    }

    try {
        var result = await CryptoStats.findOne({ coin: coinName }).sort({ timestamp: -1 }).lean();

        if (result) {
            res.json({
                price: result.price,
                marketCap: result.marketCap,
                "24hChange": result.change24h
            });
        } else {
            res.status(404).json({ error: "No data found for coin: " + coinName });
        }

    } catch (error) {
        res.status(500).json({ error: "Server error: " + error.message });
    }
});

module.exports = router;
