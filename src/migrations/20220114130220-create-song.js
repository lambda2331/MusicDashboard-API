'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('songs', {
      song_id: {
        type: Sequelize.DataTypes.INTEGER,
        primaryKey: true
      },
      title: {
        type: Sequelize.DataTypes.STRING,
        unique: true
      }
    })
  },

  down: async (queryInterface) => {
    return queryInterface.dropTable('songs')
  }
};
