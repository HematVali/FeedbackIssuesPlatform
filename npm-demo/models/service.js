const mongoose = require('mongoose');
const Joi = require('joi');
const jwt = require('jsonwebtoken');


const serviceSchema = new mongoose.Schema({
    name: { type: String, required: true },
    status: { type: Boolean, required: true },
    faults: { type: Number, required: true }
});

serviceSchema.methods.generateAuthToken = function() {
    const token = jwt.sign({}, 'mysecretkey');
    return token;
}

const Service = mongoose.model('Service', serviceSchema);

function validateService(service){
    const schema = {
        name: Joi.string().required(),
        status: Joi.boolean().required(),
        faults: Joi.number().integer().default(0)
    };

    const result = Joi.validate(service,schema);
    return result;
}

module.exports.Service = Service;
module.exports.validateService = validateService;