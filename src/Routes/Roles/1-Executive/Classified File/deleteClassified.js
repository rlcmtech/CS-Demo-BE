// controllers/deleteClassifiedFile.js
const ClassifiedFile = require('../../../../models/classifiedFile');

const DeleteClassified = async (req, res) => {
  try {
    const { id } = req.params;

    // Check role from req.user (populated by isLoggedin middleware)
    if (req.user.role !== "executive") {
      return res.status(403).json({ message: "Only executives can delete classified files." });
    }

    const file = await ClassifiedFile.findById(id);
    if (!file) return res.status(404).json({ message: "Classified file not found." });

    await file.deleteOne();

    res.status(200).json({ message: "Classified file deleted successfully." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

module.exports = DeleteClassified;
