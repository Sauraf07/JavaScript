// ==============================
// config/db.js — MySQL Connection
// ==============================

import mysql from "mysql2";

const connection = mysql.createConnection({
  host:     process.env.DB_HOST,
  user:     process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

connection.connect((err) => {
  if (err) {
    console.error("❌ Database connect nahi hua:", err.message);
    return;
  }
  console.log("✅ MySQL se connection ho gaya!");
});

export default connection;
