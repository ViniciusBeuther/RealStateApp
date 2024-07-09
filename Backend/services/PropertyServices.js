const Models = require('../models');

class PropertyServices{

    constructor( sequelize ){
        Models(sequelize);
        this.client = sequelize;
        this.models = sequelize.models;
    }

    async createProperty( data ){
        try{
           const property = await this.models.property.create(data);
           return property;
        } 
        catch(err){
            return err;
        }
    }
}

module.exports = PropertyServices;