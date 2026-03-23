import app from "./app.js";
import sequelize from "./data/database.js";

sequelize.sync().then(() => {
  console.log("Database Connected...");

  app.listen(3000, () => {
    console.log("Server running");
  });
});