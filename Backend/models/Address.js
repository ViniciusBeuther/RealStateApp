const Sequelize = require('sequelize');
const db = require('../config/database');
const Property = require('./Property');

const Address = db.define('address', {
    id: {
        type: Sequelize.STRING,
        primaryKey: true,
    },
    property_id: {
        type: Sequelize.STRING,
        references:{
            model: Property,
            key: 'id'
        }
    },
    country:{
        type: Sequelize.STRING,
    },
    state: {
        type: Sequelize.STRING,
    },
    city: {
        type: Sequelize.STRING,
    },
    neighborhood: {
        type: Sequelize.STRING,
    },
    street: {
        type: Sequelize.STRING,
    },
    number: {
        type: Sequelize.INTEGER,
    },
});

Property.hasOne(Address, { 
    foreignKey: 'property_id' ,
    allowNull: false
});
Address.belongsTo(Property);

module.exports = Address;