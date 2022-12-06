const psql = require('sequelize');

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.createTable('profiles_users', {
      id: {
        type: psql.Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      profile_id: {
        type: psql.Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'profiles',
          key: 'id',
        },
      },
      user_id: {
        type: psql.Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id',
        },
      },
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('profiles_users');
  },
};
