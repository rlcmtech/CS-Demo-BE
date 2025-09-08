const express = require("express");
const jwt = require("jsonwebtoken");
const ConfidentialFile = require("../../../../models/confidentialFile");

const router = express.Router();

// Show ONLY confidential files created by the logged-in user
router.get("/", async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ message: "Not authenticated" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const username = decoded.username;

    // Fetch confidential files ONLY created by this user
    const files = await ConfidentialFile.find({ createdBy: username });

    res.status(200).json(files);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
