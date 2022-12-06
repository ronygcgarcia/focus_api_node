'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'permissions_profiles',
      [
        {
          id: 1,
          permission_id: 1,
          profile_id: 1,
        },
        {
          id: 2,
          permission_id: 2,
          profile_id: 1,
        },
        {
          id: 3,
          permission_id: 3,
          profile_id: 1,
        },
        {
          id: 4,
          permission_id: 4,
          profile_id: 1,
        },
        {
          id: 5,
          permission_id: 5,
          profile_id: 1,
        },
        {
          id: 6,
          permission_id: 6,
          profile_id: 1,
        },
        {
          id: 7,
          permission_id: 7,
          profile_id: 1,
        },
        {
          id: 8,
          permission_id: 5,
          profile_id: 2,
        },
        {
          id: 9,
          permission_id: 6,
          profile_id: 2,
        },
      ],
    );
  },

  async down(queryInterface, Sequelize) {
    await Promise.all([queryInterface.bulkDelete('permissions_profiles', {})]);
    await queryInterface.sequelize.query('ALTER SEQUENCE permissions_profiles_id_seq RESTART WITH 1;');
  },
};
