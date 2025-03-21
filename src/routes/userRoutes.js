const express = require("express");
const router = express.Router();

const { 
    getAllUsers, 
    getUserById, 
    createUser, 
    updateUser, 
    deleteUser 
} = require("../controllers/userController");
const validatUser = require("../middlewares/inputValidator");

router.get("/users", getAllUsers);
router.get("/users/:id", getUserById);
router.post("/users", validatUser, createUser);
router.put("/users/:id", validatUser, updateUser);
router.delete("/users/:id", deleteUser);


module.exports = router;
// The code above is a route file for the user routes. It uses the express package to create a router. The router is then used to define the routes for getting all users, getting a user by id, creating a user, updating a user, and deleting a user. The router is then exported for use in other parts of the application. The router is used in the server.js file to define the user routes for the application.