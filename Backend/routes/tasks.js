const express = require("express");
const { body } = require("express-validator");
const router = express.Router();
const tasksController = require("../controllers/tasksController");
const auth = require("../middleware/auth");

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

router.get("/", auth, tasksController.getTasks);

router.get("/:id", auth, tasksController.getTaskById);

router.put("/:id", auth, tasksController.updateTask);

router.delete("/:id", auth, tasksController.deleteTask);

router.get("/analytics/dashboard", auth, tasksController.dashboardAnalytics);

module.exports = router;
