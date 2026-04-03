import * as careerModel from '../models/careerModel.js';

export const getPaths = (req, res) => { res.json({ paths: careerModel.getPaths() }); };
export const selectCareer = async (req, res) => {
  try {
    const { user_id, career_field } = req.body;
    await careerModel.deleteCareer(user_id);
    const result = await careerModel.createCareer(user_id, career_field);
    res.json({ career: { id: result.insertId, user_id, career_field } });
  } catch (error) { res.status(500).json({ message: 'Server error' }); }
};