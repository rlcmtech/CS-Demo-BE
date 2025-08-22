// Load environment variables
require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const router = require('./router'); // CommonJS import

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON
app.use(express.json());

// Mount main router
app.use('/', router);

// Test route
app.get('/', (req, res) => {
  res.send('Hello Backend!');
});

// MongoDB connection
mongoose.connect(process.env.MDB_URI, {
  useNewUrlParser: true,
})
.then(() => console.log('MongoDB connected successfully'))
.catch((err) => console.error('MongoDB connection error:', err));

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
