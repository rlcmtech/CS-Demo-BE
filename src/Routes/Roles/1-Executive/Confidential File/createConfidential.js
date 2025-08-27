const ConfidentialFile = require('../../../../models/confidentialFile');

const createConfidentialFile = async (req, res) => {
  try {
    const { filename, details, confidential, visibleTo } = req.body;

    // Extract creator username from token (or session)
    const createdBy = req.user?.username || "unknown";

    const newFile = new ConfidentialFile({
      filename,
      details,
      confidential: confidential !== undefined ? confidential : true, // defaults to true
      createdBy,
      visibleTo: Array.isArray(visibleTo) ? visibleTo : [] // default empty array
    });

    await newFile.save();

    res.status(201).json({
      message: "Confidential file created successfully",
      file: {
        id: newFile._id,
        filename: newFile.filename,
        details: newFile.details,
        confidential: newFile.confidential,
        createdBy: newFile.createdBy,
        visibleTo: newFile.visibleTo,
        createdAt: newFile.createdAt
      },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = createConfidentialFile;
