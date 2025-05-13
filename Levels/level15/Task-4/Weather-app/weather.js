import axios from "axios";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cron from "node-cron";
import cliChart from "cli-chart"; 
const { Chart } = cliChart;


dotenv.config();


mongoose.connect("mongodb://localhost:27017/weatherDB")
.then(() => console.log("✅ Connected to MongoDB"))
.catch(err => console.error("❌ MongoDB Connection Error:", err));



const weatherSchema = new mongoose.Schema({
  city: String,
  temperature: Number,
  humidity: Number,
  description: String,
  timestamp: { type: Date, default: Date.now }
});
const Weather = mongoose.model("Weather", weatherSchema);

//  Fetch Weather Data from API
async function fetchWeather(city) {
  try {
    const apiKey = process.env.OPENWEATHER_API_KEY; 
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    const response = await axios.get(url);

    const data = {
      city: response.data.name,
      temperature: response.data.main.temp,
      humidity: response.data.main.humidity,
      description: response.data.weather[0].description
    };

    console.log(`  Weather in ${data.city}: ${data.temperature}°C, ${data.humidity}% humidity, ${data.description}`);
    return data;
  } catch (error) {
    console.error(" Error fetching weather:", error.response?.data || error.message);
    return null;
  }
}


async function logWeather(city) {
  const data = await fetchWeather(city);
  if (!data) return;

  const weatherEntry = new Weather(data);
  await weatherEntry.save();
  console.log("✅ Weather data saved to MongoDB!");
}

async function getAverageTemperature(city, startDate, endDate) {
  const records = await Weather.find({
    city,
    timestamp: { $gte: new Date(startDate), $lte: new Date(endDate) }
  });

  if (records.length === 0) {
    console.log(" No records found for the given date range.");
    return;
  }

  const avgTemp =
    records.reduce((sum, record) => sum + record.temperature, 0) / records.length;
  console.log(` Average temperature in ${city} from ${startDate} to ${endDate}: ${avgTemp.toFixed(2)}°C`);
}


async function generateChart(city, startDate, endDate) {
  const records = await Weather.find({
    city,
    timestamp: { $gte: new Date(startDate), $lte: new Date(endDate) }
  });

  if (records.length === 0) {
    console.log(" No records found for the given date range.");
    return;
  }

  const chart = new Chart({ width: 50, height: 10, direction: "y" });
  records.forEach((record) => chart.addBar(record.temperature, "blue"));
  console.log(`📊 Temperature Chart for ${city}:`);
  console.log(chart.toString());
}


cron.schedule("0 * * * *", () => {
  console.log("⏳ Fetching weather data...");
  logWeather("New York"); 
});

export { logWeather, getAverageTemperature, generateChart };
