import express from "express";
import cors from "cors";
import mysql from "mysql2";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors({ origin: "*" }));  

// MySQL connection
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME
});

db.connect((err) => {
  if (err) {
    console.error("MySQL Connection Failed:", err);
    return;
  }
  console.log("MySQL Connected ✔");
});

// API Check
app.get("/api", (req, res) => {
  res.json({ message: "API is Online" });
});

// Read users
app.get("/users", (req, res) => {
  db.query("SELECT * FROM users", (err, data) => {
    if (err) return res.status(500).json({ error: err });
    res.json(data);
  });
});

app.listen(5000, () => console.log("Backend running on port 5000 🔥"));

