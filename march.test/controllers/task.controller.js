import Task from "../models/Task.js";

// GET /api/tasks — Saare tasks (sirf us user ke)
const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.findAll({
      where: { user_id: req.user.id }
    });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET /api/tasks/:id — Ek task
const getTaskById = async (req, res) => {
  try {
    const task = await Task.findOne({
      where: { id: req.params.id, user_id: req.user.id }
    });
    if (!task)
      return res.status(404).json({ error: "Task nahi mila!" });
    res.json(task);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// POST /api/tasks — Naya task banao
const createTask = async (req, res) => {
  try {
    const { title, description } = req.body;

    if (!title)
      return res.status(400).json({ error: "Title zaroori hai!" });

    const task = await Task.create({
      user_id:     req.user.id,
      title,
      description,
    });

    res.status(201).json({ message: "Task ban gaya!", task });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// PUT /api/tasks/:id — Task update karo
const updateTask = async (req, res) => {
  try {
    const task = await Task.findOne({
      where: { id: req.params.id, user_id: req.user.id }
    });

    if (!task)
      return res.status(404).json({ error: "Task nahi mila!" });

    const { title, description, status } = req.body;

    await task.update({ title, description, status });

    res.json({ message: "Task update ho gaya!", task });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// DELETE /api/tasks/:id — Task delete karo
const deleteTask = async (req, res) => {
  try {
    const task = await Task.findOne({
      where: { id: req.params.id, user_id: req.user.id }
    });

    if (!task)
      return res.status(404).json({ error: "Task nahi mila!" });

    await task.destroy();

    res.json({ message: "Task delete ho gaya!" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export { getAllTasks, getTaskById, createTask, updateTask, deleteTask };