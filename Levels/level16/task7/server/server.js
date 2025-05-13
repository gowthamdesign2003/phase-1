const express = require('express');
const app = express();

app.use(express.json());

const requestLogger = (req, res, next) => {
  const timestamp = new Date().toISOString()
  console.log(`[${timestamp}] ${req.method} request to ${req.url}`);
  next();
};

app.use(requestLogger);

app.get('/', (req, res) => {
    res.send('Home Page');
});

app.get('/about', (req, res) => {
    res.send('about Page');
});

app.get('/contact', (req, res) => {
    res.send('contact Page');
});

app.listen(3000, () => {
    console.log('Server is running on port http://loclhost:3000');
});

