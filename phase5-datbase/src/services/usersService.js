const usersModel = require("../models/usersModel");

const getAllUsers = () => {
    return usersModel.findAll();
};

const getAdultsUser = () => {
    return usersModel.findAdultUsers();
};

const getUserById = (id) => {
    const user = usersModel.findById(id);
    if (!user) {
        const error = new Error(`User with id ${id} not found`);
        error.statusCode = 404;
        throw error;
    }
    return user;
}

const updateUser = (id, user) => {
    const index = usersModel.findById(id);
    if (!index) {
        const error = new Error(`User with id ${id} not found`);
        error.statusCode = 404;
        throw error;
    }
    const {name, email, age} = user;
    verifyUser(name, email, age);

    const updatedUser = {
        id: index.id,
        name,
        email,
        age
    };

    return usersModel.updateUser(updatedUser);
};

const createUser = (user) => {
    const {name, email, age} = user;
    verifyUser(name, email, age);
    const updatedUser = {
        name,
        email,
        age
    }
    //Check if the email is UNIQUE
    const existing = usersModel.findByEmail(email);
    if (existing) {
        const error = new Error("Email already in use");
        error.statusCode = 409;
        throw error;
    }

    return usersModel.createUser(updatedUser);
};

const deleteUser = (id) => {
    const success = usersModel.deleteUser(id);
    if (!success) {
        const error = new Error(`User with id ${id} not found`);
        error.statusCode = 404;
        throw error;
    }
};

const verifyUser = (name, email, age) => {
    if (!name || !email) {
        const error = new Error(`name and email are required`);
        error.statusCode = 400;
        throw error;
    }

    if (!email.includes("@")) {
        const error = new Error(`email is invalid`);
        error.statusCode = 400;
        throw error;
    }

    if (age !== undefined && age < 0) {
        const error = new Error(`age should be a positive integer`);
        error.statusCode = 400;
        throw error;
    }

};
const getUserByEmail = (email) => {
    const existing = usersModel.findByEmail(email);
    if (existing) {
        const error = new Error("Email already in use");
        error.statusCode = 409;
        throw error;
    }
}

module.exports = {
    getAllUsers,
    getAdultsUser,
    getUserById,
    getUserByEmail,
    updateUser,
    createUser,
    deleteUser,
}