import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import User from "./user.model.js";

const Order = sequelize.define("Order",{
    total : DataTypes.FLOAT,
});

User.hasMany(Order);
Order.belongsTo(User);

export default Order;