const Task = require('../../../models/task');

const UpdateTaskProgress = async (req, res) => {
  try {
    const { id } = req.params;
    const { progress, progress_report } = req.body;

    // Validate allowed fields
    if (!progress && !progress_report) {
      return res.status(400).json({
        message: "Only progress and progress_report can be updated."
      });
    }

    // Validate progress values
    const allowedProgress = ["pending", "ongoing", "finished"];
    if (progress && !allowedProgress.includes(progress)) {
      return res.status(400).json({ message: "Invalid progress value." });
    }

    // Update only progress fields
    const task = await Task.findByIdAndUpdate(
      id,
      { progress, progress_report },
      { new: true, runValidators: true }
    );

    if (!task) return res.status(404).json({ message: "Task not found." });

    res.status(200).json({
      message: "Task progress updated successfully",
      task
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

module.exports = UpdateTaskProgress;
