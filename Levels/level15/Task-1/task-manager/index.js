const yargs = require('yargs');
const { addTask, listTasks, updateTask, deleteTask } = require('./taskManager');
yargs.command({
  command: 'add',
  describe: 'Add a new task',
  builder: {
    title: {
      describe: 'Task title',
      demandOption: true,
      type: 'string',
    },
    description: {
      describe: 'Task description',
      demandOption: true,
      type: 'string',
    },
    status: {
      describe: 'Task status',
      demandOption: true,
      type: 'string',
      choices: ['pending', 'completed'],
    },
  },
  handler(argv) {
    addTask(argv.title, argv.description, argv.status);
  },
})
.command({
  command: 'list',
  describe: 'List all tasks or filter by status',
  builder: {
    status: {
      describe: 'Filter tasks by status',
      type: 'string',
      choices: ['pending', 'completed'],
    },
  },
  handler(argv) {
    listTasks(argv.status);
  },
})
.command({
  command: 'update',
  describe: 'Update a task details or status',
  builder: {
    id: {
      describe: '1',
      demandOption: true,
      type: 'number',
    },
    title: {
      describe: 'TO-DO List',
      type: 'string',
    },
    description: {
      describe: 'This is used to do an CRUD operation',
      type: 'string',
    },
    status: {
      describe: 'New status for the task',
      type: 'string',
      choices: ['pending', 'completed'],
    },
  },
  handler(argv) {
    updateTask(argv.id, argv.title, argv.description, argv.status);
  },
})
.command({
  command: 'delete',
  describe: 'Delete a task by ID',
  builder: {
    id: {
      describe: 'Task ID to delete',
      demandOption: true,
      type: 'number',
    },
  },
  handler(argv) {
    deleteTask(argv.id);
  },
})
.parse();
