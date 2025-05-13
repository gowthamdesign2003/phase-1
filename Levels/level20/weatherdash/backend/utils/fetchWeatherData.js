const axios = require('axios');

const fetchWeatherData = async (location) => {
  const apiKey = process.env.OPENWEATHER_API_KEY;
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`;
  const response = await axios.get(url);
  const { temp, humidity } = response.data.main;
  const condition = response.data.weather[0].main;
  return { temperature: temp, humidity, condition };
};

module.exports = fetchWeatherData;
