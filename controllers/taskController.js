const { tasks, getNextId } = require("../data/tasks");

// ─── GET /tasks ───────────────────────────────────────────────
// Fetch all tasks
const getAllTasks = (req, res) => {
  res.status(200).json({
    success: true,
    count: tasks.length,
    data: tasks,
  });
};

// ─── GET /tasks/:id ───────────────────────────────────────────
// Fetch a single task by ID
const getTaskById = (req, res) => {
  const id = parseInt(req.params.id);
  const task = tasks.find((t) => t.id === id);

  if (!task) {
    return res.status(404).json({
      success: false,
      message: `Task with id ${id} not found`,
    });
  }

  res.status(200).json({ success: true, data: task });
};

// ─── POST /tasks ──────────────────────────────────────────────
// Create a new task
const createTask = (req, res) => {
  const { title, description, completed } = req.body;

  // Basic validation
  if (!title || title.trim() === "") {
    return res.status(400).json({
      success: false,
      message: "Title is required",
    });
  }

  const newTask = {
    id: getNextId(),
    title: title.trim(),
    description: description ? description.trim() : "",
    completed: completed === true ? true : false,
  };

  tasks.push(newTask);

  res.status(201).json({ success: true, data: newTask });
};

// ─── PUT /tasks/:id ───────────────────────────────────────────
// Update an existing task by ID
const updateTask = (req, res) => {
  const id = parseInt(req.params.id);
  const taskIndex = tasks.findIndex((t) => t.id === id);

  if (taskIndex === -1) {
    return res.status(404).json({
      success: false,
      message: `Task with id ${id} not found`,
    });
  }

  const { title, description, completed } = req.body;

  // Basic validation
  if (title !== undefined && title.trim() === "") {
    return res.status(400).json({
      success: false,
      message: "Title cannot be empty",
    });
  }

  // Merge existing fields with updated fields
  const updatedTask = {
    ...tasks[taskIndex],
    title:       title       !== undefined ? title.trim()       : tasks[taskIndex].title,
    description: description !== undefined ? description.trim() : tasks[taskIndex].description,
    completed:   completed   !== undefined ? completed          : tasks[taskIndex].completed,
  };

  tasks[taskIndex] = updatedTask;

  res.status(200).json({ success: true, data: updatedTask });
};

// ─── DELETE /tasks/:id ────────────────────────────────────────
// Delete a task by ID
const deleteTask = (req, res) => {
  const id = parseInt(req.params.id);
  const taskIndex = tasks.findIndex((t) => t.id === id);

  if (taskIndex === -1) {
    return res.status(404).json({
      success: false,
      message: `Task with id ${id} not found`,
    });
  }

  const deleted = tasks.splice(taskIndex, 1);

  res.status(200).json({
    success: true,
    message: `Task with id ${id} deleted successfully`,
    data: deleted[0],
  });
};

module.exports = { getAllTasks, getTaskById, createTask, updateTask, deleteTask };
