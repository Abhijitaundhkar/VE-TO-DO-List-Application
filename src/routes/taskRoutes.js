const express = require("express");
const {
  getTasks,
  getTasksById,
  createTask,
  updateTask,
  deleteTask,
} = require("../controller/taskController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();
//all routes of tasks
router.get("/", protect, getTasks);
router.get("/:id", protect, getTasksById);
router.post("/addTask", protect, createTask);
router.put("/updateTask/:id", protect, updateTask);
router.delete("/removeTask/:id", protect, deleteTask);

module.exports = router;
