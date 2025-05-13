import React from 'react';

const WeatherCard = ({ weather }) => (
  <div className="card">
    <h3>{weather.location}</h3>
    <p>{new Date(weather.date).toLocaleDateString()}</p>
    <p>🌡️ Temp: {weather.temperature}°C</p>
    <p>🌧️ Condition: {weather.condition}</p>
    <p>💧 Humidity: {weather.humidity}%</p>
  </div>
);

export default WeatherCard;
