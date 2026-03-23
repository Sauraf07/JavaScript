import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { JWT_SECRET } from "../middleware/authMiddleware.js";

// POST /api/auth/signup
const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Validation
    if (!name || !email || !password)
      return res.status(400).json({ error: "Saari fields bharo!" });

    // Email pehle se hai?
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser)
      return res.status(400).json({ error: "Email already registered hai!" });

    // Password hash karo
    const password_hash = await bcrypt.hash(password, 10);

    // User banao
    const user = await User.create({ name, email, password_hash });

    res.status(201).json({
      message: "Signup successful!",
      user: { id: user.id, name: user.name, email: user.email },
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// POST /api/auth/signin
const signin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // User dhundo
    const user = await User.findOne({ where: { email } });
    if (!user)
      return res.status(401).json({ error: "Email galat hai!" });

    // Password check karo
    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch)
      return res.status(401).json({ error: "Password galat hai!" });

    // JWT Token banao
    const token = jwt.sign(
      { id: user.id, name: user.name, email: user.email },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({ message: "Login successful!", token });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export { signup, signin };