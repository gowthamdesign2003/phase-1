const express = require('express');
const app = express();

// Set environment ('development' or 'production')
const isDev = process.env.NODE_ENV !== 'production';

app.use(express.json());


app.get('/', (req, res) => {
  res.send('<h1>Welcome to the Home Page</h1>');
});

app.get('/api/data', (req, res) => {
  res.json({ message: 'Here is your API data.' });
});

app.get('/error', (req, res, next) => {
  const error = new Error('This is a manually thrown error.');
  error.status = 500;
  next(error);
});

app.get('/user/:id', (req, res, next) => {
  const user = null; 
  if (!user) {
    const error = new Error(`User with ID ${req.params.id} not found.`);
    error.status = 404;
    return next(error);
  }
  res.json(user);
});

app.use((req, res, next) => {
  const error = new Error('Route Not Found');
  error.status = 404;
  next(error);
});

app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || 'Internal Server Error';

  const wantsJSON = req.headers.accept?.includes('application/json');

  const errorDetails = isDev ? { stack: err.stack } : {};

  if (wantsJSON || req.path.startsWith('/api')) {
    res.status(status).json({
      status,
      message,
      ...errorDetails,
    });
  } else {
    res.status(status).send(`
      <h1>Error: ${status}</h1>
      <p>${message}</p>
      ${isDev ? `<pre>${err.stack}</pre>` : ''}
    `);
  }
});

// === Start Server ===
app.listen(3000, () => {
  console.log('Server running at http://localhost:3000');
});
