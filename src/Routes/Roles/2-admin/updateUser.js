const User = require("../../../models/user.js");

const UpdateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, status, role, accessLevel, password } = req.body;

    const user = await User.findById(id);
    if (!user) return res.status(404).json({ message: "User not found." });

    // Update only provided fields
    if (name) user.name = name;
    if (email) user.email = email;
    if (status) user.status = status;
    if (role) user.role = role;
    if (accessLevel !== undefined) user.accessLevel = accessLevel;

    // ✅ This will trigger pre('save') hook and hash automatically
    if (password) user.password = password;

    await user.save();

    res.status(200).json({
      message: password
        ? "User password updated successfully"
        : "User info updated successfully",
      user,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

module.exports = UpdateUser;
