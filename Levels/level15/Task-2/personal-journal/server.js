const express = require('express');
const mongoose = require('mongoose');
const Entry = require('./entryModel');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
mongoose.connect('mongodb://localhost:27017/digital_journal', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.log('MongoDB connection error: ', err));
app.post('/entries', async (req, res) => {
  try {
    const { title, content, tags } = req.body;
    const newEntry = new Entry({ title, content, tags });
    await newEntry.save();
    res.status(201).json(newEntry);
  } catch (err) {
    res.status(400).json({ message: 'Error creating journal entry', error: err });
  }
});


app.get('/entries', async (req, res) => {
  try {
    const { title, date } = req.query;
    let filter = {};

    if (title) {
      filter.title = { $regex: title, $options: 'i' }; 
    }
    if (date) {
      filter.date = new Date(date);
    }

    const entries = await Entry.find(filter);
    res.status(200).json(entries);
  } catch (err) {
    res.status(400).json({ message: 'Error fetching journal entries', error: err });
  }
});

app.put('/entries/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content, tags } = req.body;
    const updatedEntry = await Entry.findByIdAndUpdate(
      id, 
      { title, content, tags },
      { new: true }
    );
    res.status(200).json(updatedEntry);
  } catch (err) {
    res.status(400).json({ message: 'Error updating journal entry', error: err });
  }
});

app.delete('/entries/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await Entry.findByIdAndDelete(id);
    res.status(200).json({ message: 'Entry deleted successfully' });
  } catch (err) {
    res.status(400).json({ message: 'Error deleting journal entry', error: err });
  }
});

app.get('/entries/tags', async (req, res) => {
  try {
    const { tags } = req.query;
    const entries = await Entry.find({ tags: { $in: tags.split(',') } });
    res.status(200).json(entries);
  } catch (err) {
    res.status(400).json({ message: 'Error fetching entries by tags', error: err });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
