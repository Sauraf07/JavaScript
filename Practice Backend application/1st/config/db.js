import { Sequelize } from "sequelize";

const sequelize = new Sequelize("testdb","root","root",{
    host:"localhost",
    dialect:"mysql"
});
export default sequelize;