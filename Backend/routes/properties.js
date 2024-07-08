const express = require('express');
const router = express.Router();
const db = require('../config/database');
const Property = require('../models/Property');

// get property list
router.get('/', (req, res) => 
    Property.findAll()
    .then(properties => {
        console.log(properties);

        //res.sendStatus(200);
        res.status(200).json(properties)
    })
    .catch(err => console.log(err)));

// get by ID
router.get('/:id', (req, res) => 
    {
        const { id } = req.params;

        Property.findByPk( id )
        .then(property => {
            if( !property ){
                return res.status(404).json({ error: 'Propriedade não encontrada' })
            }
            res.status(200).json(property);
        })
        .catch(err => console.log(err))
    }
)

// insert a row in database
router.get('/add', (req, res) => {
    const data = {
     id: "ZSD121ASDA23Q",
     number_rooms: 3,
     number_bathrooms: 1,
     all_rooms: ["3 Quartos", "1 Banheiro", "1 Garagem"],
     square_meters: 237.00,
     description: "Apartamento com boa localização.",
     type: "Apartamento",
     image_url: "image3.png",
     price: 890235,
     wasSold: false,
     contact: "imoboliariaY@gmail.com",
    }

    let { 
        id,
        number_rooms, 
        number_bathrooms,
        all_rooms,
        square_meters,
        description,
        type,
        image_url,
        price,
        wasSold,
        contact
    } = data;

    Property.create({
        id,
        number_rooms,
        number_bathrooms,
        all_rooms,
        square_meters,
        description,
        type,
        image_url,
        price,
        wasSold,
        contact
    })
    .then(property => res.redirect('/properties'))
    .catch(err => console.log(err));
})


module.exports = router;