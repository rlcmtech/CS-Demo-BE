const Task = require('../../../models/task');

const ApproveTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, details, status, comment, visibleTo } = req.body;

    // Find the task
    const task = await Task.findById(id);
    if (!task) return res.status(404).json({ message: "Task not found." });

    // Update only the provided fields (excluding progress & progress_report)
    if (title) task.title = title;
    if (details) task.details = details;
    if (status) task.status = status;
    if (comment) task.comment = comment;
    if (visibleTo) task.visibleTo = visibleTo;

    await task.save();

    res.status(200).json({
      message: "Task updated successfully",
      task
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

module.exports = ApproveTask;
