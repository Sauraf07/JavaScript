import { openDb } from '../config/db.js';
export const getSubjectsByUser = async (userId) => { const [rows] = await (await openDb()).query('SELECT * FROM subjects WHERE user_id = ?', [userId]); return rows; };
export const addSubject = async (userId, name) => { const [result] = await (await openDb()).query('INSERT INTO subjects (user_id, subject_name, is_important) VALUES (?, ?, FALSE)', [userId, name]); return result; };
export const setImportant = async (id, isImportant) => { await (await openDb()).query('UPDATE subjects SET is_important = ? WHERE id = ?', [isImportant ? 1 : 0, id]); };