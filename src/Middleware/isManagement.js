// middleware/isManagement.js
const isManagement = (req, res, next) => {
  if (req.user.role !== "management") {
    return res.status(403).json({ message: "Management access only" });
  }
  next();
};

module.exports = isManagement;
