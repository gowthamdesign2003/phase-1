const API_BASE = 'http://localhost:5000/api/weather';

export const getCurrentWeather = async (location) =>
  fetch(`${API_BASE}/current?location=${location}`).then(res => res.json());

export const logWeather = async (location) =>
  fetch(`${API_BASE}/log`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ location }),
  }).then(res => res.json());

export const getHistoricalData = async (location, from, to) =>
  fetch(`${API_BASE}/history?location=${location}&from=${from}&to=${to}`).then(res => res.json());
