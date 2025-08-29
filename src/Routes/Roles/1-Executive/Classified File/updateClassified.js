const mongoose = require("mongoose");
const ClassifiedFile = require("../../../../models/classifiedFile");

const updateClassifiedFile = async (req, res) => {
  try {
    const { id } = req.params; // File ID from URL
    const { filename, details, access } = req.body;

    // ✅ Validate access level if provided
    if (access && !["unclassified", "secret", "topsecret"].includes(access)) {
      return res.status(400).json({ message: "Invalid access level provided." });
    }

    // Convert to ObjectId
    const objectId = new mongoose.Types.ObjectId(id);

    // Find the file
    const file = await ClassifiedFile.findById(objectId);
    if (!file) return res.status(404).json({ message: "File not found." });

    // Update only the provided fields
    if (filename) file.filename = filename;
    if (details) file.details = details;
    if (access) file.access = access;

    // Save changes
    await file.save();

    res.status(200).json({
      message: "Classified file updated successfully",
      file: {
        id: file._id,
        filename: file.filename,
        details: file.details,
        access: file.access,
        createdBy: file.createdBy,
        createdAt: file.createdAt,
        updatedAt: file.updatedAt,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

module.exports = updateClassifiedFile;
