const express = require('express');
const router = express.Router();
const Property = require('../models/Property');
const Address = require('../models/Address');
const upload = require('../config/uploadConfig');
const fs = require('fs')
const path = require('path');

// get all properties
router.get('/', async (req, res) => {
  try {
    const properties = await Property.findAll({
      include: [{
        model: Address,
        as: 'address' 
      }]
    });
    res.status(200).json(properties);
  } catch (err) {
    console.log(err);
    res.status(500).send('Server Error');
  }
});

// get property by ID
router.get('/:id', async (req, res) => {
  try {
    const property = await Property.findOne({
        where: { id: req.params.id },
        include: [{
          model: Address,
          as: 'address'
        }]
      });

    if (!property) {
      return res.status(404).json({ error: 'Property not found' });
    }
    res.status(200).json(property);
  } catch (err) {
    console.log(err);
    res.status(500).send('Server Error');
  }
});

// add a new property
router.post('/add', async (req, res) => {
  try {
    const property = await Property.create(req.body);
    res.status(201).json(property);
  } catch (err) {
    console.log(err);
    res.status(500).send('Server Error');
  }
});

// delete property row by ID
router.delete('/delete/:id', async (req, res) => {
    try{
        const { id } = req.body;
        const deleted = await Property.destroy({
            where: { id: id }
        })

        if (!deleted){
            return res.status(404).send('Property not found.');
        }

        res.status(204);
    } catch(err){
        return res.status(500).send('Property not found.')
    }
})

// update property by ID
router.put('/update/:id', async (req, res) => {
    try{
        const { id } = req.params;
        const updated = Property.update(req.body, {
            where: { id: id },
        })

        if (!updated) { return res.status(404).send('Property not found') }

        res.status(204);
    } catch {
        return res.status(500).send('Server error')
    }
})

// Image upload route
router.post('/upload/:propertyId', (req, res) => {
  const { propertyId } = req.params;
  console.log('router id: ', propertyId);

  upload(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ error: err.message });
    }
    if (!req.files || req.files.length === 0) { 
      return res.status(400).json({ error: 'No file selected' });
    }
    
    const root = path.join(__dirname, 'uploads', propertyId);
    
    try {
      console.log('entoru no try')
      const fileNames = fs.readdirSync(root);
      console.log('leu os arquivos do dir')
      const filePaths = fileNames.map(fileName => `/uploads/${propertyId}/${fileName}`);
      console.log('pegou os path')
      
      console.log('files: ', filePaths);
      
      res.status(200).json({
        message: 'Files uploaded successfully',
        filePaths
      });
    } catch (err) {
      res.status(500).json({ error: 'Error reading uploaded files' });
    }
  });
});



module.exports = router;
