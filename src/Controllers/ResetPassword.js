const jwt = require("jsonwebtoken");
const User = require("../../src/models/user");

const resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { newPassword } = req.body;

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.userId);
    if (!user) return res.status(404).json({ message: "User not found." });

    // Update password (will trigger hashing in pre-save hook)
    user.password = newPassword;
    await user.save();

    res.status(200).json({ message: "Password reset successfully" });
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: "Invalid or expired token" });
  }
};

module.exports = resetPassword;
