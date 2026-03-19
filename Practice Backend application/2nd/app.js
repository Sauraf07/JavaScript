import express from "express";
import authrouter from "./routes/auth.routes.js";
import postrouter from "./routes/post.routes.js";

const app = express();
app.use(express.json())

app.use("/auth",authrouter)
app.use("/posts",postrouter)
export default app;
