import * as roadmapModel from '../models/roadmapModel.js';

export const generateRoadmap = async (req, res) => {
  try {
    const { user_id, career_field } = req.body;
    await roadmapModel.deleteRoadmap(user_id);
    let steps = [];
    if (career_field === 'frontend') steps = ['Learn HTML/CSS basics', 'Master JavaScript (ES6+)', 'Learn a framework (React/Vue)', 'State Management', 'CSS Architecture (Tailwind/SASS)', 'Build complex UIs'];
    else if (career_field === 'backend') steps = ['Learn a language (Node.js/Python)', 'Understand HTTP & APIs', 'Learn Relational Databases (SQL)', 'Learn NoSQL (MongoDB)', 'Authentication & Security', 'Docker & CI/CD basics'];
    else steps = ['Learn fundamentals and basics', 'Build foundation projects', 'Master core technologies', 'Create portfolio projects', 'Contribute to open source', 'Prepare for interviews', 'Start your career'];
    for (let i = 0; i < steps.length; i++) {
        await roadmapModel.createRoadmapStep(user_id, career_field, i + 1, steps[i]);
    }
    const savedSteps = await roadmapModel.getRoadmapByUser(user_id);
    res.json({ roadmap: savedSteps || [] });
  } catch (error) { res.status(500).json({ message: 'Server error' }); }
};

export const getRoadmap = async (req, res) => {
  try {
    const roadmap = await roadmapModel.getRoadmapByUser(req.params.userId);
    res.json({ roadmap: roadmap || [] });
  } catch (error) { res.status(500).json({ message: 'Server error' }); }
};