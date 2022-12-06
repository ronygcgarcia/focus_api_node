'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'users',
      [
        {
          id: 1,
          first_name: 'Rony',
          last_name: 'Garcia',
          email: 'rony.garcia@gmail.com',
          password: '$2a$12$XshPWIKzGamuzpJa59V65O35ZXolLtkR2ze1PJKC/R08NNkUMztLu',
        },
        {
          id: 2,
          first_name: 'Ana',
          last_name: 'Campos',
          email: 'ana.campos@gmail.com',
          password: '$2a$12$XshPWIKzGamuzpJa59V65O35ZXolLtkR2ze1PJKC/R08NNkUMztLu',
        },
      ],
    );
  },

  async down(queryInterface, Sequelize) {
    await Promise.all([queryInterface.bulkDelete('users', {})]);
    await queryInterface.sequelize.query('ALTER SEQUENCE users_id_seq RESTART WITH 1;');
  },
};
