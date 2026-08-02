// In-memory data store for tasks
let tasks = [
  { id: 1, title: "Setup project", description: "Initialize Node.js project", completed: false },
  { id: 2, title: "Build API",     description: "Create RESTful endpoints",    completed: false },
];

// Auto-incrementing ID counter
let nextId = 3;

module.exports = { tasks, getNextId: () => nextId++ };
