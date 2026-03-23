import { Sequelize } from "sequelize"

const sequelize = new Sequelize("task_db","root","root",{
 host:"localhost",
 dialect:"mysql"

})
export default sequelize;