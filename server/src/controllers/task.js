import Task from "../models/task.js";
import { asyncWrapper, createCustomError } from "../lib/helpers.js";

const getAllTask = asyncWrapper(async (req, res) => {
  const tasks = await Task.find();
  return res.status(200).json({
    status: "success",
    message: "Tasks data retereived successfully",
    tasks,
  });
});

const createTask = asyncWrapper(async (req, res) => {
  const task = await Task.create({
    ...req.body,
  });
  return res
    .status(201)
    .json({ status: "success", message: "Task created successfully", task });
});

const getTask = asyncWrapper(async (req, res, next) => {
  const task = await Task.findOne({ _id: req.params.id });
  if (!task) {
    return next(createCustomError(`Task not found`, 404));
  }
  return res.status(200).json({
    status: "success",
    message: "Task data retrieved successfully",
    task,
  });
});

const updateTask = asyncWrapper(async (req, res, next) => {
  const task = await Task.findByIdAndUpdate(
    { _id: req.params.id },
    { ...req.body },
    { new: true, runValidators: true }
  );
  if (!task) {
    return next(createCustomError(`Task not found`, 404));
  }
  return res
    .status(200)
    .json({ status: "success", message: "Task updated successfully", task });
});

const deleteTask = asyncWrapper(async (req, res, next) => {
  const task = await Task.findOneAndDelete({ _id: req.params.id });
  if (!task) {
    return next(createCustomError(`Task not found`, 404));
  }
  return res
    .status(200)
    .json({ status: "success", message: "Task deleted successfully", task });
});

export { getAllTask, createTask, getTask, updateTask, deleteTask };
