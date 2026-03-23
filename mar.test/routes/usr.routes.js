import { signup, signin } from "../controller/user.controller.js";
import express from "express";

const Userrouter = express.Router();

Userrouter.post("/signup", signup);
Userrouter.post("/signin", signin);

export default Userrouter;