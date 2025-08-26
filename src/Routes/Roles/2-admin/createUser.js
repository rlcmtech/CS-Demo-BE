const User = require('../../../models/user');

const createUser = async (req, res) => {
  try {
    const { name, middlename, lastname, username, password, email, role, access } = req.body;

    // Validate role & access
    if (role === "admin" && access !== "secret" && access !== "topsecret") {
      return res.status(400).json({ message: "Admin must have at least secret access." });
    }

    const newUser = new User({
      name,
      middlename,
      lastname,
      username,
      password,
      email,
      role,
      access
    });

    await newUser.save();

    res.status(201).json({
      message: "User created successfully",
      user: {
        id: newUser._id,
        name: newUser.name,
        username: newUser.username,
        email: newUser.email,
        role: newUser.role,
        access: newUser.access,
        status: newUser.status,
      },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = createUser;
