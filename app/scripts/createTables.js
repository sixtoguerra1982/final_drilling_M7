const User = require('../models/user.model');
const sequelize = require('../config/db.config');


 const load_user = async () => {
    console.log('*********CREANDO SEED USER*********')
    await User.create({firstName: 'Mateo', lastName: 'Díaz', email: 'mateo.diaz@correo.com'});
    await User.create({firstName: 'Santiago', lastName: 'Mejías', email: 'santiago.mejias@correo.com'});
    await User.create({firstName: 'Lucas', lastName: 'Rojas', email: 'lucas.rojas@correo.com'});
    await User.create({firstName: 'Facundo', lastName: 'Fernandez', email: 'facundo.fernandez@correo.com'});
    return {message: 'Datos Guardados Correctamente'};
 }

(async () => {
    try {
        await sequelize.sync({ force: true });
        console.log(await load_user());
    } catch (error) {
        console.error(error);
    } finally {
        await sequelize.close();
    }
})();