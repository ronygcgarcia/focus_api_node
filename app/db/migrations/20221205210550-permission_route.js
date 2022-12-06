const psql = require('sequelize');

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.createTable('routes_permissions', {
      id: {
        type: psql.Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      route_id: {
        type: psql.Sequelize.INTEGER,
        onDelete: 'CASCADE',
        references: {
          model: 'routes',
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
    await queryInterface.dropTable('routes_permissions');
  },
};
