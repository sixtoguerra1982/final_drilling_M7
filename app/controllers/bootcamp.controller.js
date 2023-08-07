const Bootcamp = require('../models/bootcamp.model');

const createBootcamp = async (bootcamp) => {
    try {
        const bootcampResponse = await Bootcamp.create({
            title: bootcamp.title,
            cue: bootcamp.cue,
            description: bootcamp.description
        });
        console.log(`Se ha creado el Bootcamp ${JSON.stringify(bootcampResponse, null, 4)}`);
        return bootcampResponse;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

const findById = async (id) => {
    try {
        const bootcampResponse = await Bootcamp.findByPk(id);
        if (bootcampResponse) {
            console.log(`Se ha encontrado el Bootcamp ${JSON.stringify(bootcampResponse, null, 4)}`);
            return bootcampResponse;
        } else {
            console.log(`No Se ha encontrado el Bootcamp con id ${id}`);
            return { message: 'Bootcamp no Encontrado' };
        }
    } catch (error) {
        console.error(error);
        throw error;
    }
}


const findAllBootcamp = async () => {
    try {
        const bootcamps = await Bootcamp.findAll({order: ['id']});
        console.log(`Se han encontrado Bootcamps ${JSON.stringify(bootcamps, null, 4)}`);
        return bootcamps;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

module.exports = { createBootcamp, findById, findAllBootcamp }