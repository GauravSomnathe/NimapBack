const mysql = require("mysql2");
require('dotenv').config(); // Ensure dotenv is loaded here too

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT || 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Test connection and log errors instead of throwing them
pool.getConnection((err, connection) => {
  if (err) {
    console.error("❌ MySQL Connection Error:", err.message);
    console.log("👉 Tip: Check if XAMPP/MySQL is running or if .env values are correct.");
  } else {
    console.log("✅ Database Connected (Pool Initialized)");
    connection.release();
  }
});

module.exports = pool.promise();