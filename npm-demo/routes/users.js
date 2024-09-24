const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const router = express.Router();

const {User, validateUser} = require('../models/users');

router.get('/', async (req,res) => {
    // Select * command
    const Users = await User.find();
    res.send(Users);
})

router.get('/:id', async (req,res) => {
    const findUser = await User.findById(req.params.id);
    res.send(findUser);
  })

router.get('/', async (req,res) => {
    const users = await User.find();
    res.send(users);
})


router.get('/:id', async (req,res) => {
    const findUser = await User.findById(req.params.id);
    res.send(findUser);
})


router.post('/', async(req,res) => {

    console.log(req.body);

    const {error} = validateUser(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    // check for unique email ID
    let user = await User.findOne({email: req.body.email});
    if (user) return res.status(400).send("User already registered");

    user = new User(_.pick(req.body,['name','email','password', 'role', 'department']));

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);

    await user.save();
    const token = user.generateAuthToken();

    res
        .header('x-auth-token', token)
        .header('access-control-expose-headers', 'x-auth-token')
        .send(_.pick(user,['_id','name','email','isAdmin', 'role', 'department']));
})

router.put('/:id', async (req,res) => {
    // const {error} = validateUser(req.body);
    // if (error) return res.status(400).send(error.details[0].message);

    let user;
    try {
        user = await User.findByIdAndUpdate(req.params.id, {
            name: req.body.name,
            email: req.body.email,
            isAdmin: req.body.isAdmin
        }, {new: true});
    } catch (error) {
        if (!user) return res.status(404).send("User with given ID not found");
    }
    return res.send(user);
})

router.delete('/:id', async (req,res) => {
     let users;
     try {
         users = await User.findByIdAndDelete(req.params.id);
         
     } catch (error) {
         if (!users) return res.status(400).send("Wrong ID given")
     }
 
     res.send(users);
 
 })


module.exports = router;