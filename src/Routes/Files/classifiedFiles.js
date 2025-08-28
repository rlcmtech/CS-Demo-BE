const express = require("express");
const jwt = require("jsonwebtoken");
const File = require("../../models/classifiedFile");
const levels = require("../../Middleware/accesslevelsreference");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    // Get token from cookies
    const token = req.cookies.token;
    if (!token) return res.status(401).json({ message: "Not authenticated" });

    // Decode token to extract user access level
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userLevel = levels[decoded.access];

    if (!userLevel) {
      return res.status(400).json({ message: "Invalid user access level" });
    }

    // Fetch files that are accessible to this user's level or below
    const accessibleLevels = Object.keys(levels).filter(
      (key) => levels[key] <= userLevel
    );

    const files = await File.find({ access: { $in: accessibleLevels } });

    res.status(200).json(files);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
