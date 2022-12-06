const psql = require('sequelize');

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.createTable('routes', {
      id: {
        type: psql.Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: psql.Sequelize.STRING(50),
        allowNull: false,
      },
      uri: {
        type: psql.Sequelize.TEXT,
      },
      uri_name: {
        type: psql.Sequelize.TEXT,
      },
      icon: {
        type: psql.Sequelize.STRING(255),
      },
      order: {
        type: psql.Sequelize.INTEGER,
      },
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('routes');
  },
};
