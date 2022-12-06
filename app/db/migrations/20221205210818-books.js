const psql = require('sequelize');

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.createTable('books', {
      id: {
        type: psql.Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      title: {
        type: psql.Sequelize.STRING(30),
        allowNull: false,
      },
      description: {
        type: psql.Sequelize.STRING,
        allowNull: false,
      },
      link_image: {
        type: psql.Sequelize.STRING,
        allowNull: true,
      },
      author: {
        type: psql.Sequelize.STRING,
        allowNull: false,
      },
      genre_id: {
        type: psql.Sequelize.INTEGER,
        references: {
          model: 'genres',
          key: 'id',
        },
        allowNull: false,
      },
      publish_year: {
        type: psql.Sequelize.INTEGER,
        allowNull: false,
      },
      stock: {
        type: psql.Sequelize.INTEGER,
        allowNull: false,
      },
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('books');
  },
};
