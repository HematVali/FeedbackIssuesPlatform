const express = require('express');
const {ECircumstance, validateEC} = require('../models/ecSchema');
const router = express.Router();

router.get('/', async(req,res) => {
    // Select * command
    const ECS = await ECircumstance.find();
    res.send(ECS);
})

router.get('/:id', async (req,res) => {
    let ECS;
    try {
        ECS = await ECircumstance.findById(req.params.id);
    } catch (error) {
        if (!ECS) return res.status(400).send(error.details[0].message);
        
    }

})

router.post('/', async(req,res) => {
    const {error} = validateEC(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let newEC = new ECircumstance({
       title: req.body.title,
       desc: req.body.desc,
       comments: req.body.comments,
       moduleCode: req.body.moduleCode,
       department: req.body.department,
       isUrgent: req.body.isUrgent

    });

    newEC = await newEC.save();

    res.send(newEC);
});


router.put('/:id', async (req, res) => {
    const { error } = validateEC(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let ECS;
   
    // Find the document by ID
    ECS = await ECircumstance.findById(req.params.id);

    if (!ECS) return res.status(404).send("Ticket with given ID was not found.");

    // Append the comments to the existing comments array
    ECS.comments.push(req.body.comments);

    // Save the updated document
    await ECS.save();

    
    res.send(ECS);
});


router.delete('/:id', async (req,res) => {
    let ECS;
    try {
        ECS = await ECircumstance.findByIdAndDelete(req.params.id);
    } catch (error) {
        if (!ECS) return res.status(404).send("Ticket with given ID was not found");
    }
    res.send(ECS);
})

module.exports = router;
