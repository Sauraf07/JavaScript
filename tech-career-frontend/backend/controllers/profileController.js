import * as profileModel from '../models/profileModel.js';

export const createProfile = async (req, res) => {
  try {
    const { user_id, course, semester } = req.body;
    if (user_id !== req.userId) return res.status(403).json({ message: 'Forbidden' });
    const existing = await profileModel.getProfileByUser(user_id);
    if (existing) {
      await profileModel.updateProfile(user_id, course, semester);
      const profile = await profileModel.getProfileByUser(user_id);
      return res.json({ profile });
    }
    const result = await profileModel.createProfile(user_id, course, semester);
    res.json({ profile: { id: result.insertId, user_id, course, semester } });
  } catch (error) { res.status(500).json({ message: 'Server error', error: error.message }); }
};

export const getProfile = async (req, res) => {
  try {
    const { userId } = req.params;
    if (parseInt(userId) !== req.userId) return res.status(403).json({ message: 'Forbidden' });
    const profile = await profileModel.getProfileByUser(userId);
    if (!profile) return res.status(404).json({ message: 'Profile not found' });
    res.json({ profile });
  } catch (error) { res.status(500).json({ message: 'Server error' }); }
};