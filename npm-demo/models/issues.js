const mongoose = require('mongoose');
const Joi = require('joi');

const issueSchema = new mongoose.Schema({
    title: {type: String, required: true},
    desc: {type: String, required: true},
    eta: {type: String, default: 'One Day'},
    status: {type: String, default: 'Pending'},
    comments: {type: [String], default:[], required: false},
    roomNum: {type: Number, required: false},
    typeService: {type: String, required: false}
    })


// creating a model
const Issue = mongoose.model('Issue', issueSchema);

function validateIssue(issue){
    const schema = {
        title: Joi.string().min(3).required(),
        desc: Joi.string().min(3).required(),
        comments: Joi.string().min(5),
        roomNum: Joi.number().min(3),
        typeService: Joi.string().min(5)
    }

    const result = Joi.validate(issue,schema);
    return result;
}

module.exports.Issue = Issue;
module.exports.validateIssue = validateIssue;