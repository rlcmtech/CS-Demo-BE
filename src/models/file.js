const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema(
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

const File = mongoose.model('File', fileSchema);

module.exports = File;
