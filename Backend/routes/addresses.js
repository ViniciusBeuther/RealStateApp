const express = require('express');
const router = express.Router();
const db = require('../config/database');
const Address = require('../models/Address');

router.get('/', (req, res) => 
    Address.findAll()
    .then(address => {
        res.status(200).json(address);
    })
    .catch(err => console.log(err))
)

module.exports = router;