import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const signup = async (req, res) => {
  const { name, email, password } = req.body;

  const exist = await User.findOne({ where: { email } });
  if (exist) return res.status(400).json({ msg: "Email alrady exists" });
  const hashed = await bcrypt.hash(password, 10);
  const user = await User.create({
    name,
    email,
    password: hashed,
  });

  res.json(user);
};
export const signin = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ where: { email } });
  if (!user) return res.status(404).json({ msg: "User not found" });
  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.status(400).json({ msg: "Wrong password" });
  const token = jwt.sign({ id: user.id }, "secret");
  res.json({ token });
};
