import { openDb } from '../config/db.js';
export const getTasksByUser = async (userId) => { const [rows] = await (await openDb()).query('SELECT * FROM tasks WHERE user_id = ?', [userId]); return rows; };
export const deleteTasks = async (userId) => { await (await openDb()).query('DELETE FROM tasks WHERE user_id = ?', [userId]); };
export const createTask = async (userId, desc) => { await (await openDb()).query('INSERT INTO tasks (user_id, task_description, status) VALUES (?, ?, "pending")', [userId, desc]); };
export const completeTask = async (id, userId) => { await (await openDb()).query('UPDATE tasks SET status = "completed" WHERE id = ? AND user_id = ?', [id, userId]); };
export const getCareerTitle = async (userId) => { const [rows] = await (await openDb()).query('SELECT career_field FROM careers WHERE user_id = ?', [userId]); return rows[0]; };