import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const User = sequelize.define("User",{
    email:  DataTypes.STRING,
    password:DataTypes.STRING,
})
export default User;