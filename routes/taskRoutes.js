const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware")
const {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
} = require("../controllers/taskController");

// GET    /tasks       → Fetch all tasks
// GET    /tasks/:id   → Fetch task by ID
// POST   /tasks       → Create new task
// PUT    /tasks/:id   → Update task by ID
// DELETE /tasks/:id   → Delete task by ID

// router.get("/", authMiddleware ,getAllTasks);
// router.get("/:id", authMiddleware ,getTaskById);
// router.post("/", authMiddleware ,createTask);
// router.put("/:id", authMiddleware ,updateTask);
// router.delete("/:id", authMiddleware ,deleteTask);

router.get("/" ,getAllTasks);
router.get("/:id" ,getTaskById);
router.post("/" ,createTask);
router.put("/:id" ,updateTask);
router.delete("/:id" ,deleteTask);

module.exports = router;
