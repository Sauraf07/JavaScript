import express, { Router } from "express";
import { login, register } from "../controllers/auth.controller.js";
const authrouter = express.Router();
authrouter.post("/register",register)
authrouter.post("/login",login)
export default authrouter;