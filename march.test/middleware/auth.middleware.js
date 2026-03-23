import jwt from "jsonwebtoken";

const JWT_SECRET = "dragon_boss_secret_123";

const verifyToken = (req, res, next) => {

  const authHeader = req.headers["authorization"];


  if (!authHeader)
    return res.status(401).json({ error: "Token nahi diya! Pehle login karo." });


  const token = authHeader.split(" ")[1];

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err)
      return res.status(403).json({ error: "Token invalid ya expire ho gaya!" });
    req.user = user; 
    next();
  });
};

export { verifyToken, JWT_SECRET };