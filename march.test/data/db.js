import { Sequelize } from "sequelize";

// Sequelize connection — MySQL
const sequelize = new Sequelize("taskdb", "root", "yourpassword", {
  host:    "localhost",
  dialect: "mysql",
  logging: false, // console mein SQL queries mat dikhao
});

// Connection test karo
sequelize.authenticate()
  .then(() => console.log("MySQL se connected!"))
  .catch((err) => console.error("Connection error:", err.message));

export { sequelize };