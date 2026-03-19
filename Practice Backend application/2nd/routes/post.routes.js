import express from "express";
import { verifyToken } from "../middleware/auth.middleware.js";
import { createPost, getpost } from "../controllers/post.controller.js";
const postrouter = express.Router()
postrouter.post("/",verifyToken,createPost)
postrouter.get("/",verifyToken,getpost)
export default postrouter;