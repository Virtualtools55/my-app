// lib/db.js
import mysql from "mysql2/promise";

let connection;

export async function connectDB() {
  if (connection && connection.connection && connection.connection.state !== "disconnected") {
    return connection; // already connected
  }

  connection = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
  });

  console.log("✅ MySQL connected");
  return connection;
}