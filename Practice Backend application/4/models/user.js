import { DataTypes } from "sequelize";
import sequelize from "../config/db";

const User = sequelize.define("user",{
    id:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true
    },
    name : DataTypes.STRING,
    email:{
        type:DataTypes.STRING,
        unique:true
    },
    password:DataTypes.TEXT
})
export default User;