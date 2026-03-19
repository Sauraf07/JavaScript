import app from './app.js';
import sequelize from './config/db.js';

sequelize.sync().then(()=>{
    console.log("DB connected")

    app.listen(3000,()=>{
    console.log("Server is running")
})

})