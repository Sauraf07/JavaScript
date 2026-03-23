import express from "express";
import Taskrouter from "./routes/task.routes.js";
import Userrouter from "./routes/usr.routes.js";

const app = express();
app.use(express.json());
app.use("/auth", Userrouter);
app.use("/tasks", Taskrouter);

export default app;