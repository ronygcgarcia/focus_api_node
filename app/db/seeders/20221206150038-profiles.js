'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'profiles',
      [
        {
          id: 1,
          name: 'librarian',
        },
        {
          id: 2,
          name: 'student',
        },
      ],
    );


    await queryInterface.sequelize.query('ALTER SEQUENCE profiles_id_seq RESTART WITH 3;');
  },

  async down(queryInterface, Sequelize) {
    await Promise.all([queryInterface.bulkDelete('profiles', {})]);
    await queryInterface.sequelize.query('ALTER SEQUENCE profiles_id_seq RESTART WITH 1;');
  },
};
