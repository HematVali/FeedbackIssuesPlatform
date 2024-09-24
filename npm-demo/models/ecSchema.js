const mongoose = require('mongoose');
const Joi = require('joi');

const ecSchema = new mongoose.Schema({
    title: {type: String, required: true},
    desc: {type: String, required: true},
    eta: {type: String, default: 'One Day'},
    status: {type: String, default: 'Pending'},
    comments: {type: [String], default:[], required: false},
    moduleCode: {type: String, required: true},
    department: {type: String, required: true},
    isUrgent: {type:Boolean, required: true}
})

// middleware which will execute before saving ticket
ecSchema.pre('save', function(next) {
    if (this.isModified('isUrgent')){
        this.eta = this.isUrgent ? 'One Day': 'Few Days';
    }
    next();
});


// creating model
const ECircumstance = mongoose.model('ECircumstance', ecSchema);

function validateEC(ecircumstance){
    const schema = {
        title: Joi.string().min(3).required(),
        desc: Joi.string().min(3).required(),
        comments: Joi.string().min(5),
        moduleCode: Joi.string().min(3).required(),
        department: Joi.string().min(3).required(),
        isUrgent: Joi.boolean().required()

    }

    const result = Joi.validate(ecircumstance, schema);
    return result;
}


module.exports.ECircumstance = ECircumstance;
module.exports.validateEC = validateEC;