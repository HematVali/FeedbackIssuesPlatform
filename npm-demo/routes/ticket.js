const express = require('express');
const router = express.Router();
const {Ticket, validateTicket} = require('../models/ticket');
const multer = require('multer');
const nodemailer = require('nodemailer');
const {User, validateUser} = require('../models/users');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, new Date().toISOString() + file.originalname)
  }
})

// function fileFilter (req, file, cb) {
//     if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'application/pdf'){
//         cb(null, true);
//     } else {
//         cb(null, false);
//     }

// }

const upload = multer({ 
storage: storage,
limits: {
    fileSize: 1024 * 1024 * 10 // 10 MB file size
},
// fileFilter: fileFilter

 });


router.get('/', async (req,res) => {
    // Select * command
    const Tickets = await Ticket.find();
    res.send(Tickets);
})

router.get('/:id', async (req,res) => {
  const findTicket = await Ticket.findById(req.params.id);
  res.send(findTicket);
})

router.get('/:uid/:role?/:department?', async (req,res) => {
  let tickets;
  if (req.params.role === 'admin'){
    tickets = await Ticket.find();
  } else if (req.params.role === 'staff'){
    tickets = await Ticket.find({category: 'service'});
  } else if (req.params.role === 'lecturer' && req.params.department){
    const query = {
      // or statement similar to SQL
      $or: [
        {department: req.params.department, category: 'ec'},
        {category: 'service'},
        {userId: req.params.uid}
      ]
    }
    tickets = await Ticket.find(query);
  } else {
    // user is student
    console.log("logged in as a student");
    tickets = await Ticket.find({userId: req.params.uid});

  }
  res.send(tickets);
})

router.post('/', upload.single('fileName'), async (req,res) => {
    console.log(req.body);
    const {error} = validateTicket(req.body);
    if (error) return res.status(400).send(error);

    let newTicket = new Ticket({
        title: req.body.title,
        desc: req.body.desc,
        userId: req.body.userId,
        userName: req.body.userName,
        category: req.body.category,
        department: req.body.department,
        module: req?.body?.module,
        priority: req.body.priority,
        status: req.body.status,
        reopenCount: 0,
        fileName: req?.file?.path ? "http://localhost:3000/" + req.file.path : ""
        
    });

    newTicket = await newTicket.save();

    res.send(newTicket);
})

router.put('/:id', async (req, res) => {
  console.log(req.body);
  const { error } = validateTicket(req.body);

  if (error) return res.status(400).send(error.details[0].message);

  let updatedTicket;
 
  try {
    updatedTicket = await Ticket.findByIdAndUpdate(req.params.id, {
      title: req.body.title,
      desc: req.body.desc,
      userId: req.body?.userId,
      userName: req.body?.userName,
      category: req.body?.category,
      priority: req.body?.priority,
      status: req.body?.status,
      adminComments: req.body?.adminComments,
      reopenCount: req.body?.reopenCount
     

    }, {new: true});
  } catch (error) {
    if (!updatedTicket) return res.status(404).send("Ticket with given ID not found");
  }
// MAILHOG START HERE
  const findUser = await User.findById(req.body?.userId);
  console.log("findUser " +findUser);
  // nodemailer is running here
  const transporter = nodemailer.createTransport({  
    host: 'localhost',
    port: 1025,
    secure: false,
  })

  const mailOptions = {
    from: 'admin@mailhog.com',
    to: findUser.email,
    subject: 'test-email',
    text: req.body?.userName + " your ticket has been " + req.body?.status
  }

  transporter.sendMail(mailOptions, (error,info) => {
    if (error) {
      console.log("error", error);
    } else {
      console.log("email sent" , info.response);
    }
})

// MAILHOG END
  res.send(updatedTicket);
});


router.delete('/:id', async (req,res) => {
  let deleteTicket;
  try {
      deleteTicket = await Ticket.findByIdAndDelete(req.params.id);
  } catch (error) {
      if (!deleteTicket) return res.status(404).send("Ticket with given ID was not found");
  }
  res.send(deleteTicket);
})



module.exports = router;