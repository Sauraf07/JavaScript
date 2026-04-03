import express from 'express';
import cors from 'cors';
import { initDb } from './config/db.js';

import authRoutes from './routes/authRoutes.js';
import profileRoutes from './routes/profileRoutes.js';
import subjectRoutes from './routes/subjectRoutes.js';
import careerRoutes from './routes/careerRoutes.js';
import roadmapRoutes from './routes/roadmapRoutes.js';
import taskRoutes from './routes/taskRoutes.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Init DB
initDb().then(() => console.log('✅ MySQL Database initialized.')).catch(console.error);

// Routes
app.use('/auth', authRoutes);
app.use('/profile', profileRoutes);
app.use('/subjects', subjectRoutes);
app.use('/career', careerRoutes);
app.use('/roadmap', roadmapRoutes);
app.use('/tasks', taskRoutes);

app.listen(PORT, () => {
  console.log(`\n🚀 Real Modular Backend Server running on http://localhost:${PORT}`);
});
