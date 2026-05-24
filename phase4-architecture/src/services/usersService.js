const usersModel = require("../models/usersModel");

const getAllUsers = () => {
    return usersModel.findAll();
};

const getAdultsUser = () => {
    return usersModel.findAdultUsers();
};

const getUserById = (id) => {
    const user = usersModel.findOne(id);
    if (!user) {
        const error = new Error(`User with id ${id} not found`);
        error.type = 404;
        throw error;
    }
    return user;
}

const updateUser = (id, user) => {
    const index = usersModel.findOne(id);
    if (!index) {
        const error = new Error(`User with id ${id} not found`);
        error.type = 404;
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
    return usersModel.createUser(updatedUser);
};

const deleteUser = (id) => {
    const success = usersModel.deleteUser(id);
    if (!success) {
        const error = new Error(`User with id ${id} not found`);
        error.type = 404;
        throw error;
    }
};

const verifyUser = (name, email, age) => {
    if (!name || !email) {
        const error = new Error(`name and email are required`);
        error.type = 400;
        throw error;
    }

    if (!email.includes("@")){
        const error = new Error(`email is invalid`);
        error.type = 400;
        throw error;
    }

    if (isNaN(age) || age < 0) {
        const error = new Error(`age should be a positive integer`);
        error.type = 400;
        throw error;
    }

};

module.exports = {
    getAllUsers,
    getAdultsUser,
    getUserById,
    updateUser,
    createUser,
    deleteUser,
}