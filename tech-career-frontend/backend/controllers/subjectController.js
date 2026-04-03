import * as subjectModel from '../models/subjectModel.js';

export const addSubject = async (req, res) => {
  try {
    const { user_id, subject_name } = req.body;
    const result = await subjectModel.addSubject(user_id, subject_name);
    res.json({ subject: { id: result.insertId, user_id, subject_name, is_important: false } });
  } catch (error) { res.status(500).json({ message: 'Server error' }); }
};
export const getSubjects = async (req, res) => {
  try {
    const subjects = await subjectModel.getSubjectsByUser(req.params.userId);
    res.json({ subjects: subjects || [] });
  } catch (error) { res.status(500).json({ message: 'Server error' }); }
};
export const filterImportant = async (req, res) => {
  try {
    const { user_id } = req.body;
    const subjects = await subjectModel.getSubjectsByUser(user_id);
    const subList = subjects || [];
    for (let i = 0; i < subList.length; i++) {
        const isImp = (i % 2 === 0);
        await subjectModel.setImportant(subList[i].id, isImp);
        subList[i].is_important = isImp;
    }
    res.json({ subjects: subList });
  } catch (error) { res.status(500).json({ message: 'Server error' }); }
};