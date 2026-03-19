import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const register = async (req,res)=>{
    const hased = await bcrypt.hash(req.body.password,10);
    const user = await User.create({
        email:req.body.email,
        password:hased,
    })
    res.json(user)
}

export const login = async (req,res)=>{
    const user = await User.findAll({
        where :{email: req.body.email},
    })
    const match = await bcrypt.compare(req.body.password, user.password);
    if (!match) return res.status(400).json({msg: "Wrong password"})
    
    const token = jwt.sign({id:user.id},"secret")

    res.json({token})
}