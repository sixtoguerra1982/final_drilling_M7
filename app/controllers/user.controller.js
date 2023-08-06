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
        const allUsers = await User.findAll({order: ['id']});
        console.log(`Se han encontrado los usuarios ${JSON.stringify(allUsers, null, 4)}`);
        return allUsers;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

const findUserById = async (id) => {
    try {
        const user = await User.findByPk(id);
        if (user) {
            console.log(`Se ha encontrado el usuario ${JSON.stringify(user, null, 4)}`);
            return user;
        } else {
            console.log(`No Se ha encontrado el usuario con id ${id}`);
            return { message: 'Usuario no Encontrado' };
        }
    } catch (error) {
        console.error(error);
        throw error;
    }
}

const updateUserById = async (id, user) => {
    try {
        const userFound = await User.findByPk(id);
        if (userFound) {
            const userResponse = await User.update(user, {
                where: { id: id }
            });
            return userResponse;            
        } else {
            return { message: 'Usuario no Encontrado' };
        }
    } catch (error) {
        console.error(error);
        throw error;
    }
}

module.exports = { createUser, findAll, findUserById, updateUserById }