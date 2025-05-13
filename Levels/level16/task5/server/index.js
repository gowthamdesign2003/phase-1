const express = require('express');

const app = express();

app.get('/:name', (req, res) => {
    const query = req.query.q || 'default query';
    const limit = parseInt(req.query.limit) || 10;
    res.send(`Search for: ${query}, Limit: ${limit}`);
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
 });