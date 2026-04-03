import { openDb } from '../config/db.js';
export const getRoadmapByUser = async (userId) => { const [rows] = await (await openDb()).query('SELECT * FROM roadmaps WHERE user_id = ? ORDER BY step_number ASC', [userId]); return rows; };
export const deleteRoadmap = async (userId) => { await (await openDb()).query('DELETE FROM roadmaps WHERE user_id = ?', [userId]); };
export const createRoadmapStep = async (userId, field, num, desc) => { await (await openDb()).query('INSERT INTO roadmaps (user_id, career_field, step_number, step_description) VALUES (?, ?, ?, ?)', [userId, field, num, desc]); };