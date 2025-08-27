const mongoose = require('mongoose');

const ClassifiedFileSchema = new mongoose.Schema(
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
    access: {
      type: String,
      enum: ['unclassified', 'secret', 'topsecret'],
      default: 'unclassified',
      required: true,
    },
    createdBy: {
      type: String, // username of the creator
      required: true,
    },
  },
  { timestamps: true } // adds createdAt & updatedAt automatically
);

const ClassifiedFile = mongoose.model('ClassifiedFile', ClassifiedFileSchema);

module.exports = ClassifiedFile;
