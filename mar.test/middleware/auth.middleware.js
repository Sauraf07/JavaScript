import jwt from "jsonwebtoken";
export const verifyToken = (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token) return res.status(403).json({ message: "No token" });
  const decoded = jwt.verify(token, "secret");
  req.user = decoded;
  next();
};
