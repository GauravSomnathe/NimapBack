require('dotenv').config(); // Load the .env file
const mysql = require("mysql2");

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

// Use the promise-based version
const promisePool = pool.promise();

// Check connection on startup
pool.getConnection((err, connection) => {
  if (err) {
    console.error("❌ Database Connection Failed!");
    console.error("Details:", err.message);
    // On Render, this helps you see WHY it failed without crashing the app
  } else {
    console.log("✅ Connected to MySQL Database");
    connection.release();
  }
});

module.exports = promisePool;