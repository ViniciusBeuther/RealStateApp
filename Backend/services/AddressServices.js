const Models = require('../models');

class AddressServices {
  constructor(sequelize) {
    Models(sequelize);
    this.client = sequelize;
    this.models = sequelize.models;
  }

  async createAddress(data) {
    try {
      const address = await this.models.address.create(data);
      return address;
    } catch (err) {
      return err;
    }
  }
}

module.exports = AddressServices;
