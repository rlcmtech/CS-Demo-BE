const mongoose = require('mongoose');

const ConfidentialFileSchema = new mongoose.Schema(
  {
    filename: {
      type: String,
      required: true,
      trim: true,
    },
    details: {
      type: String,
      trim: true,
    },
    confidential: {
      type: Boolean,
      default: true,
      required: true,
    },
    createdBy: {
      type: String, // username of the creator
      required: true,
    },
    visibleTo: [
      {
        type: String, // other usernames allowed to view
      },
    ],
  },
  { timestamps: true } // adds createdAt & updatedAt automatically
);

const ConfidentialFile = mongoose.model('ConfidentialFile', ConfidentialFileSchema);

module.exports = ConfidentialFile;
