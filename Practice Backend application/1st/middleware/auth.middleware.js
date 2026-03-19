import jwt from 'jsonwebtoken';

export const verfifyToken = (req,res,next)=>{
    const token = req.headers["authorized"];

    if(!token) return res.status(403).json({msg : "No token provided"});

    try {
        const decoded = jwt.verify(token,"secret");
        req.user = decoded;
        next()
    } catch  {
        res.status(401).json({msg:"invalid Token"})
        
    }
}