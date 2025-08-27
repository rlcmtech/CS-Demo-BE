const Task = require('../../../models/task');

const CreateTask = async (req, res) => {
  try {
    const { title, details, progress, progress_report, status, comment } = req.body;

    // Validate enum fields
    if (progress && !['pending', 'ongoing', 'finished'].includes(progress)) {
      return res.status(400).json({ message: "Invalid progress value." });
    }
    if (status && !['approved', 'needs revision'].includes(status)) {
      return res.status(400).json({ message: "Invalid status value." });
    }

    // Use username from decoded token
    const createdBy = req.user.username;

    const newTask = new Task({
      title,
      details,
      progress,
      progress_report,
      status,
      comment,
      createdBy
    });

    await newTask.save();

    res.status(201).json({
      message: "Task created successfully",
      task: {
        id: newTask._id,
        title: newTask.title,
        details: newTask.details,
        progress: newTask.progress,
        progress_report: newTask.progress_report,
        status: newTask.status,
        comment: newTask.comment,
        createdBy: newTask.createdBy,
        createdAt: newTask.createdAt
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

module.exports = CreateTask;
