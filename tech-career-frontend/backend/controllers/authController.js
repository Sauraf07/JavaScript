import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../middleware/auth.js';
import * as authModel from '../models/authModel.js';

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) return res.status(400).json({ message: 'Missing fields' });
    const existing = await authModel.getUserByEmail(email);
    if (existing) return res.status(400).json({ message: 'Email already exists' });
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await authModel.createUser(name, email, hashedPassword);
    const token = jwt.sign({ id: result.insertId }, JWT_SECRET, { expiresIn: '24h' });
    res.json({ user: { id: result.insertId, name, email }, token });
  } catch (error) { res.status(500).json({ message: 'Server error', error: error.message }); }
};
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ message: 'Missing fields' });
    const user = await authModel.getUserByEmail(email);
    if (!user) return res.status(401).json({ message: 'Invalid credentials' });
    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ message: 'Invalid credentials' });
    const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: '24h' });
    res.json({ user: { id: user.id, name: user.name, email: user.email }, token });
  } catch (error) { res.status(500).json({ message: 'Server error' }); }
};