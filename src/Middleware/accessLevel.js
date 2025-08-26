const jwt = require("jsonwebtoken");
const levels = require("../Middleware/accesslevelsreference");

const AccessLevel = (requiredLevel) => {
  return (req, res, next) => {
    try {
      const token = req.cookies.token;
      if (!token) return res.status(401).json({ message: "Not authenticated" });

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded; // contains role & access from token

      const userLevel = levels[req.user.access];
      const neededLevel = levels[requiredLevel];

      if (!userLevel || !neededLevel) {
        return res.status(400).json({ message: "Invalid access level" });
      }

      // User can access files at their level or below
      if (userLevel >= neededLevel) {
        return next();
      } else {
        return res.status(403).json({ message: "Access denied" });
      }
    } catch (err) {
      return res.status(401).json({ message: "Invalid or expired token" });
    }
  };
};

module.exports = AccessLevel;
