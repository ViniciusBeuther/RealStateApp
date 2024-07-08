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
    }
});

Property.hasOne(Address, { foreignKey: 'property_id' });
Address.belongsTo(Property, { foreignKey: 'property_id' });

module.exports = Address;