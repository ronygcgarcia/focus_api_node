'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'profiles_users',
      [
        {
          id: 1,
          user_id: 1,
          profile_id: 1,
        },
        {
          id: 2,
          user_id: 2,
          profile_id: 2,
        },
      ],
    );
  },

  async down(queryInterface, Sequelize) {
    await Promise.all([queryInterface.bulkDelete('profiles_users', {})]);
    await queryInterface.sequelize.query('ALTER SEQUENCE profiles_users_id_seq RESTART WITH 1;');
  },
};
