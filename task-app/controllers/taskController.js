// ==============================
// controllers/taskController.js
// Task CRUD logic
// ==============================

import { v4 as uuidv4 } from "uuid";
import * as Task from "../models/taskModel.js";

// ---- GET /api/tasks — Saari tasks ----
export const getAllTasks = (req, res) => {
  const userId = req.user.id; // verifyToken ne req.user set kiya tha

  Task.getAllTasks(userId, (err, results) => {
    if (err)
      return res.status(500).json({ error: err.message });

    res.json(results);
  });
};

// ---- GET /api/tasks/:id — Ek task ----
export const getTaskById = (req, res) => {
  const taskId = req.params.id;
  const userId = req.user.id;

  Task.getTaskById(taskId, userId, (err, results) => {
    if (err)
      return res.status(500).json({ error: err.message });

    if (results.length === 0)
      return res.status(404).json({ error: "Task nahi mili!" });

    res.json(results[0]);
  });
};

// ---- POST /api/tasks — Naya task ----
export const createTask = (req, res) => {
  const { title, description } = req.body;
  const userId = req.user.id;

  // Validation
  if (!title)
    return res.status(400).json({ error: "Title dena zaroori hai!" });

  const newTask = {
    id: uuidv4(),
    userId,
    title,
    description: description || "",
  };

  Task.createTask(newTask, (err, result) => {
    if (err)
      return res.status(500).json({ error: err.message });

    res.status(201).json({
      message: "Task ban gayi!",
      taskId: newTask.id,
    });
  });
};

// ---- PUT /api/tasks/:id — Task update ----
export const updateTask = (req, res) => {
  const taskId = req.params.id;
  const userId = req.user.id;
  const { title, description, status } = req.body;

  Task.updateTask(taskId, userId, { title, description, status }, (err, result) => {
    if (err)
      return res.status(500).json({ error: err.message });

    if (result.affectedRows === 0)
      return res.status(404).json({ error: "Task nahi mili!" });

    res.json({ message: "Task update ho gayi!" });
  });
};

// ---- DELETE /api/tasks/:id — Task delete ----
export const deleteTask = (req, res) => {
  const taskId = req.params.id;
  const userId = req.user.id;

  Task.deleteTask(taskId, userId, (err, result) => {
    if (err)
      return res.status(500).json({ error: err.message });

    if (result.affectedRows === 0)
      return res.status(404).json({ error: "Task nahi mili!" });

    res.json({ message: "Task delete ho gayi!" });
  });
};
