const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

// middlewares
app.use(express.json());
app.use(cors)

// routes

// error handling middleware

// start server
app.listen(port, () => {
    console.log(`server is running on http://localhost${port}`);
})