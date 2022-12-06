const psql = require('sequelize');

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.createTable('users', {
      id: {
        type: psql.Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      first_name: {
        type: psql.Sequelize.STRING,
        allowNull: false,
      },
      last_name: {
        type: psql.Sequelize.STRING,
        allowNull: false,
      },
      email: {
        type: psql.Sequelize.STRING,
        unique: true,
        validate: {
          isEmail: true,
        },
      },
      password: {
        type: psql.Sequelize.TEXT,
      },
      created_at: {
        type: psql.Sequelize.DATE,
      },
      updated_at: {
        type: psql.Sequelize.DATE,
      },
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('users');
  },
};
