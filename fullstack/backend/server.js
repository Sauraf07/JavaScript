import app from "./app.js";
import sequelize from "./config/db.config.js";
import User from "./models/user.model.js";

const PORT = 5000;

// connect DB
sequelize.sync()
  .then(() => {
    console.log("Database connected");
  })
  .catch((err) => {
    console.error("DB Error:", err);
  });

// start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});