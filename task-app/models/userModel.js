// ==============================
// models/userModel.js
// Users ki saari SQL queries
// ==============================

import db from "../config/db.js";

// Email se user dhundo (login ke liye)
export const findUserByEmail = (email, callback) => {
  const sql = "SELECT * FROM users WHERE email = ?";
  db.query(sql, [email], callback);
};

// Naya user banao (signup ke liye)
export const createUser = (data, callback) => {
  const sql = "INSERT INTO users (id, name, email, password_hash) VALUES (?, ?, ?, ?)";
  const values = [data.id, data.name, data.email, data.password_hash];
  db.query(sql, values, callback);
};
