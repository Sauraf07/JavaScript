// ==============================
// middleware/authMiddleware.js
// JWT Token verify karta hai
// ==============================

import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {

  // 1. Header se token lo
  const authHeader = req.headers["authorization"];

  // 2. Token nahi diya?
  if (!authHeader)
    return res.status(401).json({ error: "Token nahi diya! Pehle login karo." });

  // 3. "Bearer TOKEN" se sirf token nikalo
  const token = authHeader.split(" ")[1];

  // 4. Token verify karo
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err)
      return res.status(403).json({ error: "Token invalid ya expire ho gaya!" });

    req.user = user; // user info agle handler ko do
    next();          // aage jao
  });
};
