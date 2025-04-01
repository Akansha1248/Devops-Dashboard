const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());

// MySQL Connection
const db = mysql.createConnection({
    host: "localhost",
    user: "root",      // Change if you created a different user
    password: "yourpassword",
    database: "devops_dashboard"
});

db.connect(err => {
    if (err) {
        console.error("MySQL connection error:", err);
        return;
    }
    console.log("Connected to MySQL database.");
});

// API to fetch deployment data
app.get("/deployments", (req, res) => {
    db.query("SELECT * FROM deployments", (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).send("Database query error");
            return;
        }
        res.json(results);
    });
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
