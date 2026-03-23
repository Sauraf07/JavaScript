import { DataTypes } from "sequelize";
import sequelize from "../config/db";
import User from "./user";

const Task = sequelize.define("task",{
    id:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true
    },
    title:DataTypes.STRING,
    description:DataTypes.TEXT,
    status:{
        type:DataTypes.ENUM("pending","complete"),
        defaultValue:"pending"
    }

})
User.hasMany(Task);
Task.belongsTo(User)