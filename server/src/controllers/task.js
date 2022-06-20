import Task from "../models/task.js";

const getAllTask = async (req, res) => {
  try {
    const tasks = await Task.find();
    return res.status(200).json({
      status: "success",
      message: "Tasks data retereived successfully",
      tasks,
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: error,
    });
  }
};

const createTask = async (req, res) => {
  try {
    const task = await Task.create({
      ...req.body,
    });
    return res
      .status(201)
      .json({ status: "success", message: "Task created successfully", task });
  } catch (error) {
    return res.status(500).json({ status: "error", message: error });
  }
};

const getTask = async (req, res) => {
  try {
    const task = await Task.findOne({ _id: req.params.id });
    if (!task) {
      return res
        .status(404)
        .json({ status: "error", message: "Task not found" });
    }
    return res.status(200).json({
      status: "success",
      message: "Task data retrieved successfully",
      task,
    });
  } catch (error) {
    return res.status(500).json({ status: "error", message: error });
  }
};

const updateTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(
      { _id: req.params.id },
      { ...req.body },
      { new: true, runValidators: true }
    );
    if (!task) {
      return res
        .status(404)
        .json({ status: "error", message: "Task not found" });
    }
    return res
      .status(200)
      .json({ status: "success", message: "Task updated successfully", task });
  } catch (error) {
    return res.status(500).json({ status: "error", message: error });
  }
};

const deleteTask = async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({ _id: req.params.id });
    if (!task) {
      return res
        .status(404)
        .json({ status: "error", message: "Task not found" });
    }
    return res
      .status(404)
      .json({ status: "success", message: "Task deleted successfully", task });
  } catch (error) {
    return res.status(500).json({ status: "error", message: error });
  }
};

export { getAllTask, createTask, getTask, updateTask, deleteTask };
