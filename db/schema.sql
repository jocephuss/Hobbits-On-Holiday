DROP DATABASE IF EXISTS campaign_db;
CREATE DATABASE campaign_db;

\c campaign_db;

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL
);

CREATE TABLE characters (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  type VARCHAR(50) NOT NULL,
  hp VARCHAR(9) NOT NULL,
  position JSONB NOT NULL,
  user_id INTEGER,
  FOREIGN KEY (user_id)
  REFERENCES users(id)
  ON DELETE CASCADE
);
CREATE TABLE baddie (
  id SERIAL PRIMARY KEY,
  baddieName VARCHAR(255) NOT NULL,
  baddieIndex VARCHAR(50) NOT NULL,
  baddieImage VARCHAR(255) NOT NULL,
  baddieHP VARCHAR(9) NOT NULL,
  baddiePosition JSONB NOT NULL
);