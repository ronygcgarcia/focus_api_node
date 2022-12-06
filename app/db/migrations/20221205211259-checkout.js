const psql = require('sequelize');

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.createTable('checkouts', {
      id: {
        type: psql.Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      checkout_date: {
        type: psql.Sequelize.DATE,
        allowNull: false,
      },
      status: {
        type: psql.Sequelize.BOOLEAN,
        allowNull: false,
      },
      user_id: {
        type: psql.Sequelize.INTEGER,
        references: {
          model: 'users',
          key: 'id',
        },
        allowNull: false,
      },
      book_id: {
        type: psql.Sequelize.INTEGER,
        references: {
          model: 'books',
          key: 'id',
        },
        allowNull: false,
      },
      created_at: {
        type: psql.Sequelize.DATE,
      },
      updated_at: {
        type: psql.Sequelize.DATE,
      },
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('checkouts');
  },
};
