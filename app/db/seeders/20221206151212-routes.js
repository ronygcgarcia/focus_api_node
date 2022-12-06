'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'routes',
      [
        {
          id: 1,
          name: 'Books',
          uri: '/',
          uri_name: 'Books',
          icon: 'book',
          order: 1,
        },
        {
          id: 2,
          name: 'Checkouts',
          uri: '/checkouts',
          uri_name: 'Checkouts',
          icon: 'checkout',
          order: 2,
        },
        {
          id: 3,
          name: 'Users',
          uri: '/users',
          uri_name: 'Users',
          icon: 'user',
          order: 3,
        },
      ],
    );
  },

  async down(queryInterface, Sequelize) {
    await Promise.all([queryInterface.bulkDelete('routes', {})]);
    await queryInterface.sequelize.query('ALTER SEQUENCE routes_id_seq RESTART WITH 1;');
  },
};
