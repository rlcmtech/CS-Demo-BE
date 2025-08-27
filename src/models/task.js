const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    details: {
      type: String,
      trim: true,
    },
    progress: {
      type: String,
      enum: ['pending', 'ongoing', 'finished'],
      default: 'pending',
      required: true,
    },
    progress_report: {
      type: String,
      default: "Add progress report",
      required: true,
    },
    status: {
      type: String,
      enum: ['approved', 'needs revision'],
      default: 'needs revision',
      required: true,
    },
    comment: {
      type: String,
      trim: true,
    },
    createdBy: {
      type: String, // store username or user ID
      required: true,
    },
  },
  { timestamps: true } // adds createdAt & updatedAt automatically
);

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
