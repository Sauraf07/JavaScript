-- ==============================
-- schema.sql
-- MySQL Workbench mein run karo
-- ==============================

CREATE DATABASE IF NOT EXISTS taskappdb;
USE taskappdb;

-- Users Table
CREATE TABLE IF NOT EXISTS users (
  id           VARCHAR(36)  PRIMARY KEY,
  name         VARCHAR(100) NOT NULL,
  email        VARCHAR(100) NOT NULL UNIQUE,
  password_hash TEXT        NOT NULL,
  created_at   TIMESTAMP    DEFAULT CURRENT_TIMESTAMP
);

-- Tasks Table
CREATE TABLE IF NOT EXISTS tasks (
  id          VARCHAR(36)  PRIMARY KEY,
  user_id     VARCHAR(36)  NOT NULL,
  title       VARCHAR(200) NOT NULL,
  description TEXT,
  status      ENUM('pending', 'completed') DEFAULT 'pending',
  created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Check karo
SELECT * FROM users;
SELECT * FROM tasks;
