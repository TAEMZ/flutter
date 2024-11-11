const express = require("express");
const mysql = require("mysql2");

const app = express();
const PORT = 3000;

// Connect to MySQL
const db = mysql.createConnection({
  host: "localhost",
  user: "root", // Your MySQL username
  password: "12345678", // Your MySQL password
  database: "flutter_node_db",
});

db.connect((err) => {
  if (err) {
    console.error("Error connecting to the database:", err);
    return;
  }
  console.log("Connected to MySQL Database!");
});

// Define an API endpoint
app.get("/users", (req, res) => {
  db.query("SELECT * FROM users", (err, results) => {
    if (err) {
      res.status(500).send("Database query error");
      return;
    }
    res.json(results);
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
