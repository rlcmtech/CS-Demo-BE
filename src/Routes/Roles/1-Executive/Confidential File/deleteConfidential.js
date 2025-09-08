// controllers/deleteConfidentialFile.js
const ConfidentialFile = require('../../../../models/confidentialFile');

const DeleteConfidential = async (req, res) => {
  try {
    const { id } = req.params;

    // Only executives can delete
    if (req.user.role !== "executive") {
      return res.status(403).json({ message: "Only executives can delete confidential files." });
    }

    const file = await ConfidentialFile.findById(id);
    if (!file) return res.status(404).json({ message: "Confidential file not found." });

    await file.deleteOne();

    res.status(200).json({ message: "Confidential file deleted successfully." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

module.exports = DeleteConfidential;
