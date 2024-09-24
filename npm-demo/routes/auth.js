const express = require('express');
const router = express.Router();
const Joi = require('joi');
const bcrypt = require('bcrypt');
const {User} = require('../models/users');

router.post('/', async (req,res) => {

    const {error} = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    // check for unique email ID
    let user = await User.findOne({email: req.body.email});
    if (!user) return res.status(400).send("Invalid username or password.");


    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) return res.status(400).send("Invalid username or password.");

    const token = user.generateAuthToken();
    res.send(token);

});


function validate(req){
    const schema = ({
        email: Joi.string().email().required(),
        password: Joi.string().required()
    });

    const result = Joi.validate(req,schema);
    return result;
};


module.exports = router;