'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("users", {
      username: {
        type: Sequelize.DataTypes.STRING,
        unique: true,
        allowNull: false
      },
      email: {
        type: Sequelize.DataTypes.STRING,
        validate: {
          isEmail: true
        }
      },
      password: {
        type: Sequelize.DataTypes.STRING,
        set(value) {
          const hash = bcrypt.hashSync(value, Number(config.get('salt')))
          this.setDataValue('password', hash)
        }
      }
    })
  },

  down: (queryInterface) => {
    return queryInterface.dropTable('users');
  }
};
