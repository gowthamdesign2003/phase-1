import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

const COLORS = ['#00C49F', '#FFBB28', '#FF8042'];

const WeatherChart = ({ data }) => {
  const chartData = Object.entries(data).map(([key, value]) => ({
    name: key,
    value,
  }));

  return (
    <PieChart width={400} height={300}>
      <Pie data={chartData} dataKey="value" nameKey="name" outerRadius={100} fill="#8884d8" label>
        {chartData.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Tooltip />
      <Legend />
    </PieChart>
  );
};

export default WeatherChart;
