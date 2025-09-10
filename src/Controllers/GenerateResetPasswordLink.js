const jwt = require("jsonwebtoken");
const User = require("../models/user");

const generatePasswordResetLink = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id);
    if (!user) return res.status(404).json({ message: "User not found." });

    // Generate token (expires in 15 minutes for security)
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "15m" }
    );

    // Build reset link (frontend will handle reset UI)
    const resetLink = `${process.env.FRONTEND_URL}/reset-password/${token}`;

    // Instead of emailing, return link for admin to send manually
    res.status(200).json({
      message: "Password reset link generated successfully",
      resetLink,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

module.exports = generatePasswordResetLink;
