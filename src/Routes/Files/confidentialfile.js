// Routes/Files/confidentialFiles.js
const express = require("express");
const jwt = require("jsonwebtoken");
const ConfidentialFile = require("../../models/confidentialFile");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    // Get token from headers or cookies
    const token = req.headers.authorization?.split(" ")[1] || req.cookies.token;
    if (!token) return res.status(401).json({ message: "Not authenticated" });

    // Decode token to get logged-in user's username
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const username = decoded.username;

    if (!username) return res.status(400).json({ message: "Invalid token" });

    // Find files where the user is creator or included in visibleTo
    const files = await ConfidentialFile.find({
      $or: [{ createdBy: username }, { visibleTo: username }],
    });

    res.status(200).json(files);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
