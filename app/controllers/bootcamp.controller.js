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

module.exports = { createBootcamp }