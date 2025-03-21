const dotenv = require("dotenv");
dotenv.config();
// console.log('ENV:', process.env.PG_USER, process.env.PG_PASSWORD);

const pkg = require("pg");
const { Pool } = pkg;

const pool = new Pool({
    user: process.env.PG_USER,
    host: process.env.PG_HOST,  
    database: process.env.PG_DATABASE,
    password: process.env.PG_PASSWORD,
    port: process.env.PG_PORT,
});

pool.connect()
    .then(() => console.log('Connected to PostgreSQL database'))
    .catch(err => console.error("error connecting to the db", err.stack));

module.exports = pool;
// The code above is a configuration file for connecting to the database. It uses the pg package to create a connection pool. The pool is configured with the database connection details from the .env file. The pool is then exported for use in other parts of the application. The pool is configured to log a message when a connection is established with the database. This file is used in the server.js file to establish a connection with the database.