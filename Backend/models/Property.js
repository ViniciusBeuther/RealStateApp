const { Sequelize } = require('sequelize');
const db = require('../config/database');

const Property = db.define('property', {
    id: {
        type: Sequelize.UUID,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4
    },
    number_rooms: {
        type: Sequelize.INTEGER
    },
    number_bathrooms: {
        type: Sequelize.INTEGER
    },
    all_rooms: {
        type: Sequelize.STRING
    },
    square_meters: {
        type: Sequelize.FLOAT
    },
    description: {
        type: Sequelize.STRING
    },
    type: {
        type: Sequelize.STRING
    },
    image_url: {
        type: Sequelize.ARRAY(Sequelize.STRING)
    },
    price: {
        type: Sequelize.FLOAT
    },
    wasSold: {
        type: Sequelize.BOOLEAN
    },
    contact: {
        type: Sequelize.STRING
    },
    createdAt: {
        type: Sequelize.DATE
    },
    updatedAt: {
        type: Sequelize.DATE
    }
});

module.exports = Property;
