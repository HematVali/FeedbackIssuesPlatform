const mongoose = require('mongoose');
const Joi = require('joi');

const ticketSchema = new mongoose.Schema({
    
    title: {type: String, required: true},
    desc: {type: String, required: true},
    userId: {type: String, required: true},
    userName: {type: String, required: true},
    status: {type: String, default: "Pending"},
    date: {type: Date, default: Date.now},
    fileName: {type: String, required: false},
    category: {type: String, required: false},
    department: {type: String, required: false},
    module: {type: String, required: false},
    priority: {type: String, required: false},
    adminComments: {type: String, required: false},
    reopenCount: {type: Number, required: true}
    
    


    // eta: {type: String, default: 'Few Days'},

    // moduleCode: {type: String, required: false},
    // department: {type: String, required: false},

    // roomNum: {type: Number, required: false},
    // typeService: {type: String, required: false}
})

// middleware which will execute before saving ticket
// ticketSchema.pre('save', function(next) {
//     if (this.isModified('isUrgent')){
//         this.eta = this.isUrgent ? 'One Day': 'Few Days';
//     }
//     next();
// });

// creating a model
const Ticket = mongoose.model('Ticket', ticketSchema);

function validateTicket(ticket){
    const schema = {
        
        title: Joi.string().min(3).required(),
        desc: Joi.string().min(3).required(),
        userId: Joi.string().min(5).required(),
        category: Joi.string().min(2).required(),
        department: Joi.string(),
        module: Joi.string(),
        priority: Joi.string().min(2).required(),
        userName: Joi.string().min(2).required(),
        status: Joi.string().min(2).required(),
        adminComments: Joi.string(),
        reopenCount: Joi.number().integer().required()
       
    }

    const result = Joi.validate(ticket,schema);
    return result;
}

module.exports.Ticket = Ticket;
module.exports.validateTicket = validateTicket;