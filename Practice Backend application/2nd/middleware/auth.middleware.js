import jwt from "jsonwebtoken";

export const verifyToken = (req,res,next)=>{
    const token = req.haders["authorization"];

    if(!token) return res.status(403).json({msg: "no token"})

    const decoded = jwt.verify(token,"secret");
    req.user = decoded
    next();
}