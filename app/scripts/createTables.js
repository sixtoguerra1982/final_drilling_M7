const User = require('../models/user.model');
const sequelize = require('../config/db.config');

(async () => {
    try {
        await sequelize.sync({ force: true });
        console.log('Eliminando y resincronizando la base de datos.');
    } catch (error) {
        console.error(error);
    } finally {
        await sequelize.close();
    }
})();