const { Sequelize } = require('sequelize');
const db = require('../config/database');
const Property = require('./Property');

const Address = db.define('address', {
    id: {
        type: Sequelize.UUID,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4
    },
    property_id: {
        type: Sequelize.UUID,
        references: {
            model: Property,
            key: 'id'
        },
        field: 'property_id' 
    },
    country: {
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
    }
});

Property.hasOne(Address, {
    foreignKey: 'property_id',
    allowNull: false,
    onDelete: "CASCADE"
});
Address.belongsTo(Property, {
    foreignKey: 'property_id',
    onDelete: "CASCADE"
});

module.exports = Address;
