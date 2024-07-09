const Sequelize = require("sequelize");
module.exports = new Sequelize('real_state_app', 'postgres', 'V!n1c1us', {
    host: 'localhost',
    dialect: 'postgres',
  });
