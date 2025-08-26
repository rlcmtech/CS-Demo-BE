// middleware/isProduction.js
const isProduction = (req, res, next) => {
  if (req.user.role !== "production") {
    return res.status(403).json({ message: "Management access only" });
  }
  next();
};

module.exports = isProduction;
