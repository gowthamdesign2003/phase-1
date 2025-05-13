import { getAverageTemperature } from './weather.js';

getAverageTemperature("coimbatore", "2025-03-20", "2025-03-25")
  .then(result => {
    console.log(result);
  })
  .catch(err => console.error(err));
