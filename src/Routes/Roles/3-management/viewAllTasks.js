const Task = require("../../../models/task");

// This is now a single function, not a router
const ViewAllTasks = async (req, res) => {
  try {
    const username = req.user.username; // from isLoggedin middleware
    const role = req.user.role;

    if (role !== "management") {
      return res.status(403).json({ message: "Access denied" });
    }

    // Fetch all tasks for management
    const tasks = await Task.find();

    res.status(200).json(tasks);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = ViewAllTasks;
