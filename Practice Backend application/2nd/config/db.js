import { Sequelize } from "sequelize";

const sequelize = new Sequelize("testdb2","root","root",{
    host: "localhost",
    dialect:"mysql"
})
export default sequelize;