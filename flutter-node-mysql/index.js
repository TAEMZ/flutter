const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000; // Use Vercel's dynamic port or fallback to 3000

// Configure CORS to allow access from any origin
app.use(cors());

// MySQL Connection Configuration
const db = mysql.createConnection({
  host: process.env.DB_HOST, // MySQL server hostname
  user: process.env.DB_USER, // MySQL username
  password: process.env.DB_PASS, // MySQL password
  database: process.env.DB_NAME, // MySQL database name
  port: process.env.DB_PORT || 3306, // MySQL port (default: 3306)
});

// Connect to MySQL Database
db.connect((err) => {
  if (err) {
    console.error("Error connecting to the database:", err);
    return;
  }
  console.log("Connected to MySQL Database!");
});

// Define an API Endpoint
app.get("/users", (req, res) => {
  db.query("SELECT * FROM users", (err, results) => {
    if (err) {
      console.error("Database query error:", err);
      return res
        .status(500)
        .json({ error: "Database query error", details: err });
    }
    res.json(results);
  });
});

// Start the Server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
