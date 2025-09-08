const express = require("express");
const jwt = require("jsonwebtoken");
const ClassifiedFile = require("../../../../models/classifiedFile");

const router = express.Router();

// Show ALL classified files
router.get("/", async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ message: "Not authenticated" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Fetch ALL classified files (regardless of creator)
    const files = await ClassifiedFile.find();

    res.status(200).json(files);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
