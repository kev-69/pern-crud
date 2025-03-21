const pool = require("../config/db");


const getUserByEmailService = async (email) => {
    const result = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
    return result.rows[0];
}
const getAllUserService = async () => {
    const result = await pool.query("SELECT * FROM users");
    return result.rows;
}

const getUserByIdService = async (id) => {
    const result = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
    return result.rows[0];
}

const createUserService = async (email, name) => {
    const result = await pool.query("INSERT INTO users (email, name) VALUES ($1, $2) RETURNING *", [email, name]);
}

const updateUserService = async (id, name, email) => {
    const result = await pool.query("UPDATE users SET email = $1, name = $2 WHERE id = $3 RETURNING *", [email, name, id]);
    return result.rows[0];
}

const deleteUserService = async (id) => {
    const result = await pool.query("DELETE FROM users WHERE id = $1", [id]);
    return result.rows[0];
}

module.exports = {
    getUserByEmailService,
    getAllUserService,
    getUserByIdService,
    createUserService,
    updateUserService,
    deleteUserService
};