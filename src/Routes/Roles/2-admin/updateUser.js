const User = require("../../../models/user.js");

const UpdateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, middlename, lastname,  username, email, status, role, accessLevel } = req.body;

    const user = await User.findById(id);
    if (!user) return res.status(404).json({ message: "User not found." });

    // Update only provided fields
    if (name) user.name = name;
    if (middlename) user.middlename = middlename;
    if (lastname) user.lastname = lastname;
    if (username) user.username = username;
    if (email) user.email = email;
    if (status) user.status = status;
    if (role) user.role = role;
    if (accessLevel !== undefined) user.accessLevel = accessLevel;

    await user.save();

    res.status(200).json({
      message: "User info updated successfully",
      user,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

module.exports = UpdateUser;
