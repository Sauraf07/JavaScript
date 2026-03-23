

import express from "express";
import dotenv  from "dotenv";


dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

import authRoutes from "./routes/authRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";


app.use("/api/auth",  authRoutes);   // Signup / Signin
app.use("/api/tasks", taskRoutes);   // Task CRUD


app.get("/", (req, res) => {
  res.json({ message: "Task App API chal raha hai! 🚀" });
});


app.use((req, res) => {
  res.status(404).json({ error: "Route nahi mili!" });
});


app.use((err, req, res, next) => {
  console.error(err.message);
  res.status(500).json({ error: "Server error!", message: err.message });
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server port ${PORT} pe chal raha hai`);
});
