const Models = require('../models/Property');

class PropertyServices{

    constructor( sequelize ){
        Models(sequelize);
        this.property = sequelize;
        this.models = sequelize.models;
    }

    async createProperty( { id, number_rooms, number_bathrooms, all_rooms, square_meters, description, type, image_url, price, wasSold, contact } ){
        try{
            const property = await this.models.property.create(
                {
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
                }
            )

            return property;
        } 
        catch(err){
            return err;
        }
    }
}

module.exports = PropertyServices;