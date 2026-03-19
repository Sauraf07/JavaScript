import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const register = async (req,res)=>{
    const {name,email,password} = req.body;

    const Hasedpasssword = await bcrypt.hash(password,10);

    const user = await User.create({
        name,email,password : Hasedpasssword,
    });

    res.json(user);
};
export const login = async(req,res)=>{
    const user = await User.findOne({where:{email}});

    if(!user) return res.status(404).json({msg:"User not found"});

    const isMatch = await bcrypt.compare(password,user.password);

    if (!isMatch) return res.status(400).json({msg:"Wrong Password"});

    const token = jwt.sign({id:user.id},"secret",{
        expiresIn:"1h",
    });
    res.json({token});
}