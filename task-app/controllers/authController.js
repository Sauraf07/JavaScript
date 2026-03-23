// ==============================
// controllers/authController.js
// Signup aur Signin logic
// ==============================

import bcrypt from "bcryptjs";
import jwt    from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";
import * as User from "../models/userModel.js";

// ---- POST /api/auth/signup ----
export const signup = (req, res) => {
  const { name, email, password } = req.body;

  // 1. Validation
  if (!name || !email || !password)
    return res.status(400).json({ error: "Name, email aur password do!" });

  // 2. Email pehle se exist karta hai?
  User.findUserByEmail(email, (err, results) => {
    if (err)
      return res.status(500).json({ error: err.message });

    if (results.length > 0)
      return res.status(400).json({ error: "Email pehle se registered hai!" });

    // 3. Password hash karo (bcrypt)
    const password_hash = bcrypt.hashSync(password, 10);

    // 4. User save karo
    const newUser = {
      id: uuidv4(),      // unique ID generate karo
      name,
      email,
      password_hash,
    };

    User.createUser(newUser, (err, result) => {
      if (err)
        return res.status(500).json({ error: err.message });

      res.status(201).json({ message: "Signup successful! Ab login karo." });
    });
  });
};

// ---- POST /api/auth/signin ----
export const signin = (req, res) => {
  const { email, password } = req.body;

  // 1. Validation
  if (!email || !password)
    return res.status(400).json({ error: "Email aur password do!" });

  // 2. Email se user dhundo
  User.findUserByEmail(email, (err, results) => {
    if (err)
      return res.status(500).json({ error: err.message });

    if (results.length === 0)
      return res.status(401).json({ error: "Email ya password galat hai!" });

    const user = results[0];

    // 3. Password check karo (bcrypt compare)
    const isMatch = bcrypt.compareSync(password, user.password_hash);
    if (!isMatch)
      return res.status(401).json({ error: "Email ya password galat hai!" });

    // 4. JWT Token banao
    const token = jwt.sign(
      { id: user.id, name: user.name, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({ message: "Login successful!", token });
  });
};
