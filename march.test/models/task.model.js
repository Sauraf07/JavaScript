import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";
import User from "./User.js";

const Task = sequelize.define("Task", {
  id: {
    type:         DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey:   true,
  },
  user_id: {
    type:       DataTypes.UUID,
    allowNull:  false,
    references: {
      model: "users",
      key:   "id",
    },
  },
  title: {
    type:      DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
  },
  status: {
    type:         DataTypes.ENUM("pending", "completed"),
    defaultValue: "pending",
  },
}, {
  tableName:  "tasks",
  timestamps: true,
  createdAt:  "created_at",
  updatedAt:  "updated_at",
});

User.hasMany(Task, { foreignKey: "user_id" });
Task.belongsTo(User, { foreignKey: "user_id" });

export default Task;