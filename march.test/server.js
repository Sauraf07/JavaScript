import express from "express";
import bodyParser from "body-parser";
import authRoutes from "./routes/authRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";
import { sequelize } from "./config/db.js";

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api/auth",  authRoutes);
app.use("/api/tasks", taskRoutes);

app.get("/", (req, res) => {
  res.json({ message: "Task App chal raha hai!" });
});

const PORT = 5000;

sequelize.sync({ force: false })
  .then(() => {
    console.log("Database sync ho gaya!");
    app.listen(PORT, () => {
      console.log(`Server ${PORT} pe chal raha hai`);
    });
  })
  .catch((err) => {
    console.error("DB sync error:", err.message);
  });