const Task = require("../models/Task");
const cache = require("../utils/cache");

// GET all tasks
const getAllTasks = async (req, res, next) => {
  try {
    const cacheKey = 'all_tasks';
    const cached = cache.get(cacheKey);

    if (cached) {
      console.log('Cache HIT for all_tasks');
      return res.json(cached);
    }

    console.log('Cache MISS for all_tasks');
    const tasks = await Task.find();
    const count = await Task.countDocuments();
    cache.set(cacheKey, tasks);

    res.status(200).json({
      success: true,
      count,
      data: tasks,
    });
  } catch (err) {
    next(err);
  }
};

// GET task by ID
const getTaskById = async (req, res, next) => {
  try {
    // const cacheKey = 'task_${req.params.id}';
    // const cached = cache.get(cacheKey);

    // if (cached) {
    //   console.log('Cache HIT for task_${req.params.id}');
    //   return res.json(cached);
    // }

    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    // cache.set(cacheKey, task);
    res.status(200).json({ success: true, data: task });
  } catch (err) {
    next(err);
  }
};

// CREATE task
const createTask = async (req, res, next) => {
  try {
    const task = await Task.create(req.body);
    cache.del('all_tasks'); // invalidate
    cache.del(`task_${req.params.id}`); // invalidate specific task cache

    res.status(201).json({
      success: true,
      data: task,
    });
  } catch (err) {
    next(err);
  }
};

// UPDATE task
const updateTask = async (req, res, next) => {
  try {
    const updated = await Task.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    cache.del('all_tasks'); // invalidate
    cache.del(`task_${req.params.id}`); // invalidate specific task cache
    res.status(200).json({
      success: true,
      data: updated,
    });
  } catch (err) {
    next(err);
  }
};

// DELETE task
const deleteTask = async (req, res, next) => {
  try {
    const deleted = await Task.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    cache.del('all_tasks'); // invalidate
    cache.del(`task_${req.params.id}`); // invalidate specific task cache

    res.status(200).json({
      success: true,
      message: "Task deleted",
    });
  } catch (err) {
    next(err);
  }
};

module.exports = { getAllTasks, getTaskById, createTask, updateTask, deleteTask, };