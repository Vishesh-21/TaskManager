const router = require("express").Router();
const Task = require("../Models/task");
const user = require("../Models/user");
const User = require("../Models/user");
const { authenticationToken } = require("./auth");

// route to create a new task
router.post("/create", authenticationToken, async (req, res) => {
  try {
    const { title, desc } = req.body;
    const { id } = req.headers;
    if (!id) {
      return res.status(400).json({ message: "User ID is required!" });
    }
    // Check if a task with the same description already exists
    const existingTask = await Task.findOne({ desc });
    if (existingTask) {
      return res
        .status(400)
        .json({ message: "Task with this description already exists!" });
    }

    const newtask = new Task({ title, desc });
    const savetask = await newtask.save();
    const taskId = savetask._id;
    await User.findByIdAndUpdate(id, { $push: { tasks: taskId._id } });
    res.status(200).json({ message: "task created !" });
  } catch (error) {
    console.log(error);
  }
});

// route of get all the create tasks
router.get("/alltasks", authenticationToken, async (req, res) => {
  try {
    const { id } = req.headers;
    const userData = await User.findById(id).populate({
      path: "tasks",
      options: { sort: { createdAt: -1 } },
    });
    res.status(200).json({ data: userData });
  } catch (error) {
    res.status(400).json({ message: "Internal server issue!" });
  }
});

// route to delete a specific task
router.delete("/delete/:id", authenticationToken, async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.headers.id;
    const delTask = await Task.findByIdAndDelete(id);

    const userData = await User.findByIdAndUpdate(userId, {
      $pull: { tasks: id },
    });

    return res.status(200).json({ deletedTask: delTask, user: userData });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server issue!" });
  }
});

// route to upadate the content of task
router.put("/update/:id", authenticationToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { title, desc } = req.body;
    const updatedTask = await Task.findByIdAndUpdate(id, { title, desc });
    res
      .status(200)
      .json({ message: "Task update successfully!", UpdatedTask: updatedTask });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Issue!" });
  }
});

// route to prioritize tasks on based of their importance
router.put("/update-imp/:id", authenticationToken, async (req, res) => {
  try {
    const { id } = req.params;
    const taskData = await Task.findById(id);
    const impoTask = taskData.important;
    await Task.findByIdAndUpdate(id, { important: !impoTask });
    res.status(200).json({ message: "Update successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server issue!" });
  }
});

// route to mark a check on tasks if they are complete or not
router.put("/update-complete/:id", authenticationToken, async (req, res) => {
  try {
    const { id } = req.params;
    const taskData = await Task.findById(id);
    const completeTask = taskData.complete;
    await Task.findByIdAndUpdate(id, { complete: !completeTask });
    res.status(200).json({ message: "Update successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server issue!" });
  }
});

// route to get all the important tasks
router.get("/important-tasks", authenticationToken, async (req, res) => {
  try {
    const { id } = req.headers;
    const Data = await User.findById(id).populate({
      path: "tasks",
      match: { important: true },
      options: { sort: { createdAt: -1 } },
    });
    const impo_task = Data.tasks;
    res.status(200).json({ data: impo_task });
  } catch (error) {
    res.status(400).json({ message: "Internal server issue!" });
  }
});

// route to get all the complete tasks
router.get("/complete-tasks", authenticationToken, async (req, res) => {
  try {
    const { id } = req.headers;
    const Data = await User.findById(id).populate({
      path: "tasks",
      match: { complete: true },
      options: { sort: { createdAt: -1 } },
    });
    const complete_task = Data.tasks;
    res.status(200).json({ data: complete_task });
  } catch (error) {
    res.status(400).json({ message: "Internal server issue!" });
  }
});

// route to get all the Incomplete tasks
router.get("/incomplete-tasks", authenticationToken, async (req, res) => {
  try {
    const { id } = req.headers;
    const Data = await User.findById(id).populate({
      path: "tasks",
      match: { complete: false },
      options: { sort: { createdAt: -1 } },
    });
    const Incomplete_task = Data.tasks;
    res.status(200).json({ data: Incomplete_task });
  } catch (error) {
    res.status(400).json({ message: "Internal server issue!" });
  }
});

module.exports = router;
