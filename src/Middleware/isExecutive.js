// middleware/isExecutive.js
const isExecutive = (req, res, next) => {
  if (req.user.role !== "executive") {
    return res.status(403).json({ message: "executive access only" });
  }
  next();
};

module.exports = isExecutive;
