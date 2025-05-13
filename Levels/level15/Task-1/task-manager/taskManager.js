const { readData, writeData } = require('./utils');
const tasksFilePath = './tasks.json';

const addTask = async (title, description, status) => {
  try {
    const tasks = await readData(tasksFilePath);
    const task = {
      id: tasks.length + 1,
      title,
      description,
      status,
      createdAt: new Date().toISOString(),
    };
    tasks.push(task);
    await writeData(tasksFilePath, tasks);
    console.log('Task added successfully!');
  } catch (error) {
    console.error('Error adding task:', error);
  }
};


const listTasks = async (status = '') => {
  try {
    const tasks = await readData(tasksFilePath);
    const filteredTasks = status ? tasks.filter(task => task.status === status) : tasks;
    console.table(filteredTasks);
  } catch (error) {
    console.error('Error listing tasks:', error);
  }
};

const updateTask = async (id, title, description, status) => {
  try {
    const tasks = await readData(tasksFilePath);
    const task = tasks.find(task => task.id === id);
    if (!task) {
      console.log('Task not found!');
      return;
    }
    if (title) task.title = title;
    if (description) task.description = description;
    if (status) task.status = status;
    await writeData(tasksFilePath, tasks);
    console.log('Task updated successfully!');
  } catch (error) {
    console.error('Error updating task:', error);
  }
};


const deleteTask = async (id) => {
  try {
    const tasks = await readData(tasksFilePath);
    const taskIndex = tasks.findIndex(task => task.id === id);
    if (taskIndex === -1) {
      console.log('Task not found!');
      return;
    }
    tasks.splice(taskIndex, 1);
    await writeData(tasksFilePath, tasks);
    console.log('Task deleted successfully!');
  } catch (error) {
    console.error('Error deleting task:', error);
  }
};

module.exports = { addTask, listTasks, updateTask, deleteTask };
