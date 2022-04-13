const Task = require("../models/taskModel");
const asyncHandler = require("express-async-handler");

// @desc get all tasks
// @route GET api/v1/tasks
// @access PRIVATE
const getTasks = asyncHandler(async (req, res) => {
  const tasks = await Task.find();
  res.status(200).json(tasks);
});

// @desc get a single task
// @route GET api/v1/tasks/:id
// @access PRIVATE
const getTask = asyncHandler(async (req, res) => {
  const task = await Task.findById(req.params.id);
  if (!task) {
    res.status(400);
    throw new Error("Task was not found");
  }
  res.status(200).json(task);
});

// @desc post a new task to all tasks
// @route POST api/v1/tasks
// @access PRIVATE
const postTask = asyncHandler(async (req, res) => {
  if (!req.body.name) {
    res.status(400);
    throw new Error("Please fill in the name");
  }
  const task = await Task.create(req.body);
  res.status(201).json(task);
});

// @desc patch/update a single task
// @route PATCH api/v1/tasks/:id
// @access PRIVATE
const patchTask = asyncHandler(async (req, res) => {
  const task = await Task.findById(req.params.id);
  if (!task) {
    res.status(400);
    throw new Error("Task was not found");
  }

  const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });

  res.status(200).json(updatedTask);
});

// @desc delete a single task
// @route DELETE api/v1/tasks/:id
// @access PRIVATE
const deleteTask = asyncHandler(async (req, res) => {
  const task = await Task.findById(req.params.id);
  if (!task) {
    res.status(400);
    throw new Error("Task was not found");
  }

  await Task.findByIdAndDelete(req.params.id);
  res.status(200).json(task);
});

module.exports = { getTasks, getTask, postTask, patchTask, deleteTask };
