import Task from "../models/task.model.js";
export const createTask = async (req, res) => {
  const task = await Task.create({
    ...req.body,
    UserId: req.user.id,
  });

  res.json(task);
};
export const getTasks = async (req, res) => {
  const tasks = await Task.findAll({
    where: { UserId: req.user.id },
  });

  res.json(tasks);
};
export const getTaskById = async (req, res) => {
  const task = await Task.findByPk(req.params.id);

  res.json(task);
};

export const updateTask = async (req, res) => {
  const task = await Task.findByPk(req.params.id);

  await task.update(req.body);

  res.json(task);
};
export const deleteTask = async (req, res) => {
  const task = await Task.findByPk(req.params.id);

  await task.destroy();

  res.json({ msg: "Deleted" });
};
