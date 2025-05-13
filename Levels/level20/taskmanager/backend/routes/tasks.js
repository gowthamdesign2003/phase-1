// routes/tasks.js
const express = require('express');
const router = express.Router();
const Task = require('../models/Task');

// Create a new task
router.post('/', async (req, res) => {
  try {
    const { title, description, date } = req.body;
    const newTask = new Task({ title, description, date });
    await newTask.save();
    res.status(201).json(newTask);
  } catch (err) {
    res.status(500).json({ msg: 'Failed to create task' });
  }
});

// Get all tasks
router.get('/', async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ msg: 'Failed to fetch tasks' });
  }
});

// Delete a task
router.delete('/:id', async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.json({ msg: 'Task deleted' });
  } catch (err) {
    res.status(500).json({ msg: 'Failed to delete task' });
  }
});

// Update a task
router.put('/:id', async (req, res) => {
  try {
    const { title, description, date } = req.body;
    const updatedTask = await Task.findByIdAndUpdate(
      req.params.id,
      { title, description, date },
      { new: true }
    );
    res.json(updatedTask);
  } catch (err) {
    res.status(500).json({ msg: 'Failed to update task' });
  }
});

module.exports = router;
