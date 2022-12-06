'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'genres',
      [
        {
          id: 1,
          name: 'Horror',
        },
        {
          id: 2,
          name: 'Drama',
        },
        {
          id: 3,
          name: 'Thriller',
        },
      ],
    );
  },

  async down(queryInterface, Sequelize) {
    await Promise.all([queryInterface.bulkDelete('genres', {})]);
    await queryInterface.sequelize.query('ALTER SEQUENCE genres_id_seq RESTART WITH 1;');
  },
};
