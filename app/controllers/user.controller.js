const User = require('../models/user.model');

const createUser = async (user) => {
    try {
        const userResponse = await User.create({
            firstName: user.first_name,
            lastName: user.last_name,
            email: user.email.toLowerCase()
        });
        console.log(`Se ha creado el usuario ${JSON.stringify(userResponse, null, 4)}`);
        return userResponse;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

const findAll = async () => {
    try {
        const allUsers = await User.findAll();
        console.log(`Se han encontrado los usuarios ${JSON.stringify(allUsers, null, 4)}`);
        return allUsers;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

module.exports = { createUser, findAll }