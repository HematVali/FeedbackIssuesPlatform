const express = require('express');
const {Issue, validateIssue} = require('../models/issues');
const router = express.Router();

router.get('/', async (req,res) => {
    // Select * command
    const Issues = await Issue.find();
    res.send(Issues);
});

router.get('/:id', async (req,res) => {
    const Issues = await Issue.findById(req.params.id);
    res.send(Issues);
})

router.post('/', async (req,res) => {
    const {error} = validateIssue(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let newIssue = new Issue({
        title: req.body.title,
        desc: req.body.desc,
        comments: req.body.comments,
        roomNum: req.body.roomNum,
        typeService: req.body.typeService
    });

    newIssue = await newIssue.save();

    res.send(newIssue);
});

router.put('/:id', async (req,res) => {
    const {error} = validateIssue(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let issue;
    
    issue = await Issue.findById(req.params.id);
    if (!issue) return res.status(404).send("Ticket with given ID was not found.");

    issue.comments.push(req.body.comments);

    await issue.save();

    res.send(issue);
    
})

router.delete('/:id', async (req,res) => {
    let issue;

    try {
        issue = await Issue.findByIdAndDelete(req.params.id);
    } catch (error) {
        if (!issue) return res.status(404).send("Ticket with given ID was not found");
    }
    res.send(issue);

})

module.exports = router;