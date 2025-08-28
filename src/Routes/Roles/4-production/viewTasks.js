// routes/viewTasks.js
const express = require("express");
const jwt = require("jsonwebtoken");
const Task = require("../../../models/task");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    // Get token from headers (or cookies)
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ message: "Not authenticated" });

    // Decode token to get username and role
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const username = decoded.username;
    const role = decoded.role; // should be "management" or "production"

    // Only allow management or production roles
    if (!["management", "production"].includes(role)) {
      return res.status(403).json({ message: "Access denied" });
    }

    // Fetch tasks where user is either the creator or in visibleTo array
    const tasks = await Task.find({
      $or: [
        { createdBy: username },
        { visibleTo: username } // assuming you add 'visibleTo' array in schema
      ]
    });

    res.status(200).json(tasks);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
