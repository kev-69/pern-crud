const pool = require('../config/db');

const createUserTable = async () => {
    const query = `
        CREATE TABLE IF NOT EXISTS users (
            id SERIAL PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            email VARCHAR(255) UNIQUE NOT NULL,
            created_at TIMESTAMP DEFAULT NOW()
        )
    `;
    try {
        pool.query(query);
        console.log('User table created successfully');
    } catch (error) {
        console.error('Error creating user table:', error);
        
    }
}

module.exports = createUserTable;
// The code above is a function that creates a user table in the database. The function uses the pool object from the database configuration file to execute a SQL query that creates a users table with columns for id, name, email, and created_at. The function logs a message when the table is created successfully or an error message if an error occurs. The function is then exported for use in other parts of the application. The function is used in the server.js file to create the user table before starting the server.
