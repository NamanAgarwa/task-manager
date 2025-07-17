const Task = require("../models/Task");
const mongoose = require("mongoose");
const { validationResult } = require("express-validator");

// Create a new task
exports.createTask = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const { title, description, dueDate, priority } = req.body;
    const task = new Task({
      title,
      description,
      dueDate,
      priority,
      user: req.user.id,
    });
    await task.save();
    res.status(201).json(task);
  } catch (err) {
    res.status(500).json({ errors: [{ msg: "Server error" }] });
  }
};

// Get all tasks with filtering, sorting, and search
exports.getTasks = async (req, res) => {
  try {
    const {
      status,
      search,
      sortBy,
      sortOrder,
      page = 1,
      limit = 10,
    } = req.query;
    const query = { user: req.user.id };
    if (status === "completed") query.completed = true;
    if (status === "pending") query.completed = false;
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ];
    }
    let sort = {};
    if (sortBy) {
      sort[sortBy] = sortOrder === "desc" ? -1 : 1;
    } else {
      sort["dueDate"] = 1;
    }
    const skip = (parseInt(page) - 1) * parseInt(limit);
    const [tasks, total] = await Promise.all([
      Task.find(query).sort(sort).skip(skip).limit(parseInt(limit)),
      Task.countDocuments(query),
    ]);
    res.json({ tasks, total, page: parseInt(page), limit: parseInt(limit) });
  } catch (err) {
    res.status(500).json({ errors: [{ msg: "Server error" }] });
  }
};

// Get a single task by ID
exports.getTaskById = async (req, res) => {
  try {
    const task = await Task.findOne({ _id: req.params.id, user: req.user.id });
    if (!task) return res.status(404).json({ msg: "Task not found" });
    res.json(task);
  } catch (err) {
    res.status(500).json({ errors: [{ msg: "Server error" }] });
  }
};

// Update a task
exports.updateTask = async (req, res) => {
  try {
    const updates = req.body;
    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      updates,
      { new: true }
    );
    if (!task) return res.status(404).json({ msg: "Task not found" });
    res.json(task);
  } catch (err) {
    res.status(500).json({ errors: [{ msg: "Server error" }] });
  }
};

// Delete a task
exports.deleteTask = async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id,
    });
    if (!task) return res.status(404).json({ msg: "Task not found" });
    res.json({ msg: "Task deleted" });
  } catch (err) {
    res.status(500).json({ errors: [{ msg: "Server error" }] });
  }
};

// Dashboard analytics: priority distribution, completion rate, upcoming deadlines
exports.dashboardAnalytics = async (req, res) => {
  try {
    const userId = req.user.id;
    // Task Distribution by Priority
    const priorityDist = await Task.aggregate([
      {
        $match: {
          user: new mongoose.Types.ObjectId(userId),
        },
      },
      { $group: { _id: "$priority", count: { $sum: 1 } } },
    ]);
    // Completion Rate (percentage completed)
    const total = await Task.countDocuments({ user: userId });
    const completed = await Task.countDocuments({
      user: userId,
      completed: true,
    });
    const completionRate =
      total === 0 ? 0 : Math.round((completed / total) * 100);
    // Upcoming Deadlines (next 7 days)
    const now = new Date();
    const week = new Date();
    week.setDate(now.getDate() + 7);
    const upcoming = await Task.find({
      user: userId,
      dueDate: { $gte: now, $lte: week },
      completed: false,
    }).sort({ dueDate: 1 });
    res.json({
      priorityDist,
      completionRate,
      upcoming,
      total,
      completed,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ errors: [{ msg: "Server error" }] });
  }
};
