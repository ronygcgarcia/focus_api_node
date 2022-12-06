'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'permissions',
      [
        {
          id: 1,
          name: 'ROLE_CHECKOUT_USER',
        },
        {
          id: 2,
          name: 'ROLE_PROFILE_LIST',
        },
        {
          id: 3,
          name: 'ROLE_USER_LIST',
        },
        {
          id: 4,
          name: 'ROLE_USER_CREATE',
        },
        {
          id: 5,
          name: 'ROLE_BOOK_LIST',
        },
        {
          id: 6,
          name: 'ROLE_CHECKOUT_LIST',
        },
        {
          id: 7,
          name: 'ROLE_USER_CREATE',
        },
      ],
    );
  },

  async down(queryInterface, Sequelize) {
    await Promise.all([queryInterface.bulkDelete('permissions', {})]);
    await queryInterface.sequelize.query('ALTER SEQUENCE permissions_id_seq RESTART WITH 1;');
  },
};
