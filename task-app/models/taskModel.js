// ==============================
// models/taskModel.js
// Tasks ki saari SQL queries
// ==============================

import db from "../config/db.js";

// Sirf us user ki tasks lao
export const getAllTasks = (userId, callback) => {
  const sql = "SELECT * FROM tasks WHERE user_id = ?";
  db.query(sql, [userId], callback);
};

// ID se ek task lao
export const getTaskById = (id, userId, callback) => {
  const sql = "SELECT * FROM tasks WHERE id = ? AND user_id = ?";
  db.query(sql, [id, userId], callback);
};

// Naya task banao
export const createTask = (data, callback) => {
  const sql = `INSERT INTO tasks (id, user_id, title, description, status)
               VALUES (?, ?, ?, ?, 'pending')`;
  const values = [data.id, data.userId, data.title, data.description];
  db.query(sql, values, callback);
};

// Task update karo
export const updateTask = (id, userId, data, callback) => {
  const sql = `UPDATE tasks SET title = ?, description = ?, status = ?
               WHERE id = ? AND user_id = ?`;
  const values = [data.title, data.description, data.status, id, userId];
  db.query(sql, values, callback);
};

// Task delete karo
export const deleteTask = (id, userId, callback) => {
  const sql = "DELETE FROM tasks WHERE id = ? AND user_id = ?";
  db.query(sql, [id, userId], callback);
};
