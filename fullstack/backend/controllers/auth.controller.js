import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const SECRET = "mysecretkey";

// Register
export const register = async (req, res) => {
  try {
    const hashedPassword = bcrypt.hashSync(req.body.password, 8);

    const user = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword
    });

    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Login
export const login = async (req, res) => {
  try {
    const user = await User.findOne({
      where: { email: req.body.email }
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const validPassword = bcrypt.compareSync(
      req.body.password,
      user.password
    );

    if (!validPassword) {
      return res.status(401).json({ message: "Invalid password" });
    }

    const token = jwt.sign({ id: user.id }, SECRET, {
      expiresIn: "1d"
    });

    res.json({
      id: user.id,
      username: user.username,
      email: user.email,
      accessToken: token
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};