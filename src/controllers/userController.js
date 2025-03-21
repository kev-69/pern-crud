const express = require("express");
const router = express.Router();
const { 
    getUserByEmailService,
    getAllUserService,
    getUserByIdService,
    createUserService,
    updateUserService,
    deleteUserService
} = require("../models/userModel");

const responseHandler = (res, status, message, data = null) => {
    return res.status(status).json({
        status,
        message,
        data
    });
}

const getAllUsers = async (req, res, next) => {
    try {
        const users = await getAllUserService();
        responseHandler(res, 200, "Users retrieved successfully", users);
    } catch (error) {
        next(error);
    }
}

const getUserById = async (req, res, next) => {
    const { id } = req.params;
    try {
        const user = await getUserByIdService(id);
        if (!user) return responseHandler(res, 404, "User not found");
        responseHandler(res, 200, "User retrieved successfully", user);
    } catch (error) {
        next(error);
    }
}

const createUser = async (req, res, next) => {
    const { email, name } = req.body;
    try {
        // check if user already exists
        const existingUser = await getUserByEmailService(email);
        if (existingUser) return responseHandler(res, 400, "User already exists");

        // create new user
        const newUser = await createUserService(req.body.email, req.body.name);
        responseHandler(res, 201, "User created successfully", newUser);
    } catch (error) {
        if (error.code === "23505") {
            return responseHandler(res, 400, "User already exists");
        }
        next(error);
    }
}

const updateUser = async (req, res, next) => {
    const { id } = req.params;
    const { email, name } = req.body;
    try {
        const updatedUser = await updateUserService(id, email, name);
        if (!updatedUser) return responseHandler(res, 404, "User not found");
        responseHandler(res, 200, "User updated successfully", updatedUser);
    } catch (error) {
        next(error);
    }
}

const deleteUser = async (req, res, next) => {
    const { id } = req.params;
    try {
        const deletedUser = await deleteUserService(id);
        responseHandler(res, 200, "User deleted successfully", deletedUser);
        if (!deletedUser) return responseHandler(res, 404, "User not found");   
    } catch (error) {
        next(error);
    }
}


module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser
};