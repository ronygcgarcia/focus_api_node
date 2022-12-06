const psql = require('sequelize');

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.createTable('permissions_profiles', {
      id: {
        type: psql.Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      profile_id: {
        type: psql.Sequelize.INTEGER,
        references: {
          model: 'profiles',
          key: 'id',
        },
      },
      permission_id: {
        type: psql.Sequelize.INTEGER,
        references: {
          model: 'permissions',
          key: 'id',
        },
      },
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('permissions_profiles');
  },
};
