const Models = require('../models/Address');

class AddressServices{
    constructor( sequelize ){
        Models(sequelize);
        this.address = sequelize;
        this.models = sequelize.models
    }

    async createAddress({ property_id, country, state, city, neighborhood, street, number }){
        
        try{
            const address = this.models.address.create({
                property_id, 
                country, 
                state, 
                city, 
                neighborhood, 
                street, 
                number
            })

            return address;
        } catch(err){
            return err;
        }
    }

}

module.exports = AddressServices;