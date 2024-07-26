const express = require('express');
const router = express.Router();
const Address = require('../models/Address');

/* 
  Main CRUD routes
  - Get all addresses
  - Add a new address
  - Delete address from DB by ID
  - Update a address
*/

// get all addresses
router.get('/', async (req, res) => {
  try {
    const addresses = await Address.findAll();
    res.status(200).json(addresses);
  } catch (err) {
    console.log(err);
    res.status(500).send('Server Error');
  }
},
);

// add new address
router.post('/add', async (req, res) => {
    try{
        const { property_id, country, state, city, neighborhood, street, number } = req.body;

        const newAddress = await Address.create({
          property_id,
          country,
          state,
          city,
          neighborhood,
          street,
          number
        });
    
        res.status(201).json(newAddress);
    } catch(err){
        console.log(err);
        res.status(500).send('Server Error');
    }
})

// delete address by ID
router.delete('/delete/:id', async (req, res) => {
   try{
    const { id } = req.params;
    const deleted = await Address.destroy({
        where: { id: id }
    })

    if (!deleted) {
        return res.status(404).send('Address not found')
    }

    res.status(204);
   } catch(err){
    return res.status(404).send('Address not found')
   } 
})

// update address by ID
router.put('/update/:id', async (req, res) => {
    try{
        const { id } = req.params;
        const updated = Address.update(req.body,{
            where: { id:id }
        })

        if( !updated ){
            return res.status(404).send('Address not found')
        }

        res.status(204);
    } catch(err){
        return res.status(500).send('Server error.')
    }
})

module.exports = router;
