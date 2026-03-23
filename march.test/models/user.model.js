import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

const User = sequelize.define("User", {
  id: {
    type:         DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey:   true,
  },
  name: {
    type:      DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type:      DataTypes.STRING,
    allowNull: false,
    unique:    true,
  },
  password_hash: {
    type:      DataTypes.TEXT,
    allowNull: false,
  },
}, {
  tableName:  "users",
  timestamps: true,
  createdAt:  "created_at",
  updatedAt:  false,
});

export default User;