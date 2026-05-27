const users = [
    {id: 1, name: "Alice Dupont", email: "alice@email.com", age: 25},
    {id: 2, name: "Bob Martin", email: "bob@email.com", age: 18},
    {id: 3, name: "Charlie Leroy", email: "charlie@email.com", age: 29},
    {id: 4, name: "Diana Lefevre", email: "diana@email.com", age: 145},
    {id: 5, name: "Eve Moreau", email: "eve@email.com", age: 26}
];
let nextIndex = 6;
// get all users
const findAll = () => {
    return users;
};

// get a user by id
const findOne = (userId) => {
    return users.find((user) => user.id === userId);
};

//get adult users
const findAdultUsers = () => {
    return users.filter(user => user.age >= 18);
}

// create a user
const createUser = (body) => {
    const newUser = {
        id: nextIndex,
        ...body
    }
    users.push(newUser);
    nextIndex++;

    return newUser;
};

//update a user
const updateUser = (userData) => {
    const index = users.findIndex((user) => user.id === userData.id);
    if (index === -1) return null;

    return users[index] = {
        id: nextIndex,
        ...userData
    };
};

//delete a user
const deleteUser = (userId) => {
    const index = users.findIndex((user) => user.id === userId);
    if (index === -1) return false;
    users.splice(index, 1);
    return true
};

module.exports = {
    findAll,
    findOne,
    findAdultUsers,
    createUser,
    updateUser,
    deleteUser,
}