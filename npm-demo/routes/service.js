const express = require('express');
const router = express.Router();
const { Service, validateService } = require('../models/service');
const multer = require('multer');
const nodemailer = require('nodemailer');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, new Date().toISOString() + file.originalname)
  }
});

// Initialize multer with storage configuration
const upload = multer({ 
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 10 // 10 MB file size limit
  }
});

router.get('/', async (req, res) => {
  try {
    const services = await Service.find();
    res.json(services);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/', upload.single('fileName'), async (req, res) => {

  const { error } = validateService(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  try {
    const existingService = await Service.findOne({ name: req.body.name });

    if (existingService) {
      res.status(409).send('Service with the same name already exists.');
    } else {
      let newService = new Service({
        name: req.body.name,
        status: req.body.status,
        faults: req.body.faults,
        fileName: req.file ? "http://localhost:3000/" + req.file.path : "",
        
      });

      // console.log(newService);
      newService = await newService.save();

      res.send(newService);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put('/:id', async (req, res) => {
  const { error } = validateService(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let updatedService = await Service.findByIdAndUpdate(req.params.id, {
    name: req.body.name,
    status: req.body.status,
    faults: req.body.faults,
  }, { new: true });

  if (!updatedService) return res.status(404).send('Service with the given ID was not found.');
  res.send(updatedService);
});


router.delete('/:id', async (req, res) => {
  try {
    const deletedService = await Service.findByIdAndRemove(req.params.id);
    if (!deletedService) {
      return res.status(404).send('Service with the given ID was not found.');
    }
    res.send(deletedService);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;