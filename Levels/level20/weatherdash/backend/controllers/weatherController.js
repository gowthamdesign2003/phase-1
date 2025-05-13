const Weather = require('../models/Weather');
const fetchWeatherData = require('../utils/fetchWeatherData');

exports.getCurrentWeather = async (req, res) => {
  try {
    const { location } = req.query;
    const data = await fetchWeatherData(location);
    res.json({ location, date: new Date(), ...data });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch weather' });
  }
};

exports.logWeather = async (req, res) => {
  try {
    const { location } = req.body;
    const data = await fetchWeatherData(location);
    const newWeather = new Weather({ location, date: new Date(), ...data });
    await newWeather.save();
    res.status(201).json(newWeather);
  } catch (err) {
    res.status(500).json({ error: 'Failed to log weather' });
  }
};

exports.getHistoricalData = async (req, res) => {
  try {
    const { location, from, to } = req.query;
    const data = await Weather.find({
      location,
      date: { $gte: new Date(from), $lte: new Date(to) }
    });

    const avgTemp = data.reduce((sum, d) => sum + d.temperature, 0) / data.length || 0;
    const conditions = {};
    data.forEach(d => conditions[d.condition] = (conditions[d.condition] || 0) + 1);

    res.json({ data, avgTemp, conditions });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch historical data' });
  }
};
