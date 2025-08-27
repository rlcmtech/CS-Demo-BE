require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./src/models/user'); // Adjust path to your user model

async function testLogin() {
  try {
    // 1️⃣ Connect to MongoDB
    await mongoose.connect(process.env.MDB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB');

    const username = "luisexec";
    const password = "QwertyPass123";

    // 2️⃣ Find user
    const user = await User.findOne({ username });
    if (!user) {
      console.log('User not found');
      return process.exit(0);
    }

    console.log('Stored hash:', user.password);

    // 3️⃣ Compare password using model method
    const isMatch = await user.comparePassword(password);

    if (isMatch) {
      console.log('✅ Password matches!');
    } else {
      console.log('❌ Password does NOT match!');
    }

    process.exit(0);

  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

testLogin();

