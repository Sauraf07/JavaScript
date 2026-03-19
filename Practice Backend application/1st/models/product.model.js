import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Product = sequelize.define("Product",{
    name:DataTypes.STRING,
    price : DataTypes.FLOAT,
})
export default Product;