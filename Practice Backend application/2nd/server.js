import { Sequelize } from "sequelize";
import app from "./app.js";
import sequelize from "./config/db.js";


sequelize.sync().then(()=>{
    app.listen(3000,()=>{
        console.log("Server running")
    })
})