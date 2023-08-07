const User = require('../models/user.model');
const Bootcamp = require('../models/bootcamp.model');
const sequelize = require('../config/db.config');


 const load_user = async () => {
    console.log('*********CREANDO SEED USER*********');
    await User.create({firstName: 'Mateo', lastName: 'Díaz', email: 'mateo.diaz@correo.com'});
    await User.create({firstName: 'Santiago', lastName: 'Mejías', email: 'santiago.mejias@correo.com'});
    await User.create({firstName: 'Lucas', lastName: 'Rojas', email: 'lucas.rojas@correo.com'});
    await User.create({firstName: 'Facundo', lastName: 'Fernandez', email: 'facundo.fernandez@correo.com'});
    return {message: 'Datos Guardados Correctamente User'};
 }

 const load_bootcamp = async () => {
    console.log('*********CREANDO SEED BOOTCAMP*********');
    await Bootcamp.create({title:'Introduciendo El Bootcamp De React.', 
                           cue: 10, 
                           description: 'React es la librería más usada en JavaScript para el desarrollo de interfaces.'});

    await Bootcamp.create({title:'Bootcamp Desarrollo Web Full Stack.', 
                           cue: 12, 
                           description: 'Crearás aplicaciones web utilizand las tecnologías y lenguajes más actuales y populares como: JavaScript, nodeJS, Angular,MongoDB, ExpressJS.'});
    
    await Bootcamp.create({title:'Bootcamp Big Data, Inteligencia Artificial & Machine Learning ', 
                        cue: 18, 
                        description: 'Domina Data Science, y todo el ecosistema de lenguajes herramientas de Big Data, e intégralos con modelos avanzados'});

    return {message: 'Datos Guardados Correctamente Bootcamp'};
 }

(async () => {
    try {
        await sequelize.sync({ force: true });
        console.log(await load_user());
        console.log(await load_bootcamp());
    } catch (error) {
        console.error(error);
    } finally {
        await sequelize.close();
    }
})();