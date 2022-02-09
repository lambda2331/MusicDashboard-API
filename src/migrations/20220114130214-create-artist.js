'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('artists', {
      artist_id: {
        type: Sequelize.DataTypes.INTEGER,
        primaryKey: true
      },
      name: {
        type: Sequelize.DataTypes.STRING,
        unique: true
      }
    });
  },

  down: (queryInterface) => {
    return queryInterface.dropTable('artists');
  }
};
