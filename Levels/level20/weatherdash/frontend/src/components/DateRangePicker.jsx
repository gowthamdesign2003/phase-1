import React from 'react';

const DateRangePicker = ({ from, to, setFrom, setTo }) => (
  <div className="date-range">
    <label>From: <input type="date" value={from} onChange={(e) => setFrom(e.target.value)} /></label>
    <label>To: <input type="date" value={to} onChange={(e) => setTo(e.target.value)} /></label>
  </div>
);

export default DateRangePicker;
