// ==============================
// routes/taskRoutes.js
// Saari task routes — sab protected!
// ==============================

import express from "express";
import { verifyToken } from "../middleware/authMiddleware.js";
import {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
} from "../controllers/taskController.js";

const router = express.Router();

// Saari task routes pe verifyToken lagega
// GET    /api/tasks
router.get("/",     verifyToken, getAllTasks);

// GET    /api/tasks/:id
router.get("/:id",  verifyToken, getTaskById);

// POST   /api/tasks
router.post("/",    verifyToken, createTask);

// PUT    /api/tasks/:id
router.put("/:id",  verifyToken, updateTask);

// DELETE /api/tasks/:id
router.delete("/:id", verifyToken, deleteTask);

export default router;
