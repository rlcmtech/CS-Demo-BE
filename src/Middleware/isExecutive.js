// middleware/isExecutive.js
const isExecutive = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ message: "Unauthorized: No user data" });
  }
  if (req.user.role !== "executive") {
    return res.status(403).json({ message: "Executive access only" });
  }
  next();
};

module.exports = isExecutive;
