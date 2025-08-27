const ClassifiedFile = require('../../../../models/classifiedFile');

const createClassifiedFile = async (req, res) => {
  try {
    const { filename, details, access } = req.body;

    // Validate access level
    if (!['unclassified', 'secret', 'topsecret'].includes(access)) {
      return res.status(400).json({ message: "Invalid access level provided." });
    }

    // ✅ Use logged-in user's username
    const createdBy = req.user.username;

    const newFile = new ClassifiedFile({
      filename,
      details,
      access,
      createdBy
    });

    await newFile.save();

    res.status(201).json({
      message: "Classified file created successfully",
      file: {
        id: newFile._id,
        filename: newFile.filename,
        details: newFile.details,
        access: newFile.access,
        createdBy: newFile.createdBy,
        createdAt: newFile.createdAt
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

module.exports = createClassifiedFile;
