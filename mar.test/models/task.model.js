import { DataTypes } from "sequelize";
import sequelize from "../data/database.js";
import User from "./user.model.js";

const Task = sequelize.define("Task", {
  title: DataTypes.STRING,
  description: DataTypes.TEXT,
  status: {
    type: DataTypes.STRING,
    defaultValue: "pending",
  },
});

User.hasMany(Task);
Task.belongsTo(User);

export default Task;