const express = require("express");
const { body } = require("express-validator");
const router = express.Router();
const tasksController = require("../controllers/tasksController");
const auth = require("../middleware/auth");

// Create Task
router.post(
  "/",
  auth,
  [
    body("title").notEmpty().withMessage("Title is required"),
    body("dueDate").isISO8601().withMessage("Valid due date is required"),
    body("priority")
      .isIn(["High", "Medium", "Low"])
      .withMessage("Priority must be High, Medium, or Low"),
  ],
  tasksController.createTask
);

// Get All Tasks (with filtering, sorting, search)
router.get("/", auth, tasksController.getTasks);

// Get Task by ID
router.get("/:id", auth, tasksController.getTaskById);

// Update Task
router.put("/:id", auth, tasksController.updateTask);

// Delete Task
router.delete("/:id", auth, tasksController.deleteTask);

// Analytics Dashboard
router.get("/analytics/dashboard", auth, tasksController.dashboardAnalytics);

module.exports = router;
