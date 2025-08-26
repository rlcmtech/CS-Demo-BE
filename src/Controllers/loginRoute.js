// Controllers/login.js
const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const router = express.Router();

router.post("/", async (req, res) => {   // 👈 change from "/login" → "/"
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { id: user._id, role: user.role, access: user.access },
      process.env.JWT_SECRET,
      { expiresIn: "4h" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    res.json({
  message: "Login successful",
  token, // <-- include token here
  user: {
    id: user._id,
    username: user.username,
    role: user.role,
    access: user.access,
  },
});
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
