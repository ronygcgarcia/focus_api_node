'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'routes_permissions',
      [
        {
          id: 1,
          permission_id: 5,
          route_id: 1,
        },
        {
          id: 2,
          permission_id: 6,
          route_id: 2,
        },
        {
          id: 3,
          permission_id: 7,
          route_id: 3,
        },
      ],
    );
  },

  async down(queryInterface, Sequelize) {
    await Promise.all([queryInterface.bulkDelete('routes_permissions', {})]);
    await queryInterface.sequelize.query('ALTER SEQUENCE routes_permissions_id_seq RESTART WITH 1;');
  },
};
