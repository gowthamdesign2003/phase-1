import React, { useState } from 'react';
import { getCurrentWeather, getHistoricalData, logWeather } from './api';
import WeatherCard from './components/WeatherCard';
import WeatherChart from './components/WeatherChart';
import DateRangePicker from './components/DateRangePicker';
import './styles.css';

const App = () => {
  const [location, setLocation] = useState('');
  const [current, setCurrent] = useState(null);
  const [history, setHistory] = useState([]);
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [avgTemp, setAvgTemp] = useState(0);
  const [conditions, setConditions] = useState({});

  const handleSearch = async () => {
    const data = await getCurrentWeather(location);
    setCurrent(data);
    await logWeather(location);
  };

  const handleHistory = async () => {
    const { data, avgTemp, conditions } = await getHistoricalData(location, from, to);
    setHistory(data);
    setAvgTemp(avgTemp);
    setConditions(conditions);
  };

  return (
    <div className="container">
      <h1>🌦️ WeatherDash</h1>
      <input placeholder="Enter location" value={location} onChange={(e) => setLocation(e.target.value)} />
      <button onClick={handleSearch}>Get Current Weather</button>
      {current && <WeatherCard weather={current} />}
      <DateRangePicker from={from} to={to} setFrom={setFrom} setTo={setTo} />
      <button onClick={handleHistory}>Get Historical Data</button>
      <h3>Average Temp: {avgTemp.toFixed(2)}°C</h3>
      {Object.keys(conditions).length > 0 && <WeatherChart data={conditions} />}
    </div>
  );
};

export default App;
