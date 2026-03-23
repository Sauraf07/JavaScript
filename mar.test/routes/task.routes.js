import express from "express";
import {createTask,getTasks,getTaskById,updateTask,deleteTask,} from "../controller/task.controller.js";
import { verifyToken } from "../middleware/auth.middleware.js";


const Taskrouter = express.Router();

Taskrouter.post("/", verifyToken, createTask);
Taskrouter.get("/", verifyToken, getTasks);
Taskrouter.get("/:id", verifyToken, getTaskById);
Taskrouter.put("/:id", verifyToken, updateTask);
Taskrouter.delete("/:id", verifyToken, deleteTask);

export default Taskrouter;
