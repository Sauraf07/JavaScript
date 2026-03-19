import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import User from "./user.model.js";

const Post = sequelize.define("Post",{
    title :DataTypes.STRING,
    content : DataTypes.TEXT,
})

// assoication
User.hasMany(Post);
Post.belongsTo(User);

export default Post;