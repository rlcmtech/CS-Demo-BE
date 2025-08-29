const ConfidentialFile = require('../../../../models/confidentialFile');

const updateConfidentialFile = async (req, res) => {
  try {
    const { id } = req.params;
    const { filename, details, confidential, visibleTo } = req.body;

    // Find the file
    const file = await ConfidentialFile.findById(id);
    if (!file) return res.status(404).json({ message: "File not found." });

    // Update only the provided fields
    if (filename) file.filename = filename;
    if (details) file.details = details;
    if (confidential !== undefined) file.confidential = confidential;
    if (visibleTo) file.visibleTo = visibleTo;

    await file.save();

    res.status(200).json({
      message: "Confidential file updated successfully",
      file
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

module.exports = updateConfidentialFile;
