const express = require('express');
const User = require('../../../models/user'); // adjust path as needed
const router = express.Router();

// GET all users (excluding password)
router.get('/', async (req, res) => {
  try {
    const users = await User.find({}, '-password'); 
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching users', error: err.message });
  }
});

module.exports = router;
