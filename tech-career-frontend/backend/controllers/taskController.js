import * as taskModel from '../models/taskModel.js';

export const generateTasks = async (req, res) => {
  try {
    const { user_id } = req.body;
    const careerRow = await taskModel.getCareerTitle(user_id);
    const career = careerRow ? careerRow.career_field : 'general';
    let taskDescriptions = ['Read about the basic concepts', 'Set up your development environment', 'Follow an introductory tutorial', 'Build your first simple project', 'Push your code to GitHub'];
    if (career === 'frontend') taskDescriptions = ['Setup Vite + React', 'Create a responsive layout using CSS Grid', 'Fetch an API in a React component', 'Deploy on Vercel'];
    await taskModel.deleteTasks(user_id);
    for (const desc of taskDescriptions) { await taskModel.createTask(user_id, desc); }
    const tasks = await taskModel.getTasksByUser(user_id);
    res.json({ tasks: tasks || [] });
  } catch (error) { res.status(500).json({ message: 'Server error' }); }
};
export const getTasks = async (req, res) => {
  try {
    const tasks = await taskModel.getTasksByUser(req.params.userId);
    res.json({ tasks: tasks || [] });
  } catch (error) { res.status(500).json({ message: 'Server error' }); }
};
export const completeTask = async (req, res) => {
  try {
    const { task_id, user_id } = req.body;
    await taskModel.completeTask(task_id, user_id);
    const taskList = await taskModel.getTasksByUser(user_id);
    const task = (taskList || []).find(t => t.id == task_id);
    if (!task) return res.status(404).json({ message: 'Task not found' });
    res.json({ task });
  } catch (error) { res.status(500).json({ message: 'Server error' }); }
};