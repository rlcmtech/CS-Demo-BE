require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const router = require('./router'); // other routes

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));




// Other routes
app.use('/', router);

// Test route
app.get('/', (req, res) => res.send('Hello Backend!'));

// MongoDB connection
mongoose.connect(process.env.MDB_URI)
  .then(() => console.log('MongoDB connected successfully'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Start server
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
