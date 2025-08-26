// Load environment variables
require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const router = require('./router'); // Your router.js file
const cors = require('cors');
const cookieParser = require('cookie-parser'); // ✅ import cookie-parser

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON
app.use(express.json());

// ✅ Cookie parser middleware (must come before routes)
app.use(cookieParser());

// Optional: enable CORS if calling from frontend
app.use(cors({
  origin: "http://localhost:5173", // your frontend URL
  credentials: true // ✅ allow cookies to be sent
}));

// Mount main router
app.use('/', router);

// Test route
app.get('/', (req, res) => {
  res.send('Hello Backend!');
});

// MongoDB connection
mongoose.connect(process.env.MDB_URI)
  .then(() => console.log('MongoDB connected successfully'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
