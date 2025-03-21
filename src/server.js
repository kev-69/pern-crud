const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const pool = require("./config/db"); 

const userRoutes = require("./routes/userRoutes");
const errorHandler = require("./middlewares/errorHandler");
const createUserTable = require("./data/createUserTable");

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

// middlewares
app.use(express.json());
app.use(cors())

// routes
app.use("/api", userRoutes);
// The code above is the server file for the application. It uses the express package to create an express application. The application is configured with middleware to parse JSON data and enable CORS. The application is then configured with routes for the user routes. The routes are prefixed with /api. The application listens on port 3001 by default. The application is then exported for use in other parts of the application. The application is used in the index.js file to start the server.

// error handling middleware
app.use(errorHandler)

// Create table before starting the server (if it doesn't exist)
createUserTable();

app.get("/", async(req, res) => {
    const result = await pool.query("SELECT current_database()");
    res.send(result.rows[0].current_database);
})

// start server
app.listen(port, () => {
    console.log(`server is running on http://localhost:${port}`);
})