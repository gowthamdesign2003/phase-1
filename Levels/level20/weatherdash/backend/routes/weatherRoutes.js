const express = require('express');
const { getCurrentWeather, logWeather, getHistoricalData } = require('../controllers/weatherController');

const router = express.Router();

router.get('/current', getCurrentWeather);
router.post('/log', logWeather);
router.get('/history', getHistoricalData);

module.exports = router;
