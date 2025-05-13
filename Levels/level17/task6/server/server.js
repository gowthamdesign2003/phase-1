const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const postRoutes = require('./routes/posts');
const userRoutes = require('./routes/users');

const app = express();
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/population_demo', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('MongoDB connected'));

app.use('/api/posts', postRoutes);
app.use('/api/users', userRoutes);

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
