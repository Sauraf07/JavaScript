import { openDb } from '../config/db.js';
export const getPaths = () => [
 { id: 'frontend', name: 'Frontend Development', skills: ['HTML', 'CSS', 'JavaScript', 'React', 'Vue', 'UI/UX'] },
 { id: 'backend', name: 'Backend Development', skills: ['Node.js', 'Python', 'Databases', 'APIs', 'Docker'] },
 { id: 'fullstack', name: 'Full Stack Development', skills: ['Frontend', 'Backend', 'Databases', 'DevOps'] },
 { id: 'devops', name: 'DevOps Engineer', skills: ['Docker', 'Kubernetes', 'CI/CD', 'Cloud (AWS/GCP)'] },
 { id: 'data_science', name: 'Data Science', skills: ['Python', 'SQL', 'Machine Learning', 'Pandas', 'Math'] },
 { id: 'mobile', name: 'Mobile App Development', skills: ['Swift', 'Kotlin', 'React Native', 'Flutter'] }
];
export const deleteCareer = async (userId) => { await (await openDb()).query('DELETE FROM careers WHERE user_id = ?', [userId]); };
export const createCareer = async (userId, field) => { const [result] = await (await openDb()).query('INSERT INTO careers (user_id, career_field) VALUES (?, ?)', [userId, field]); return result; };