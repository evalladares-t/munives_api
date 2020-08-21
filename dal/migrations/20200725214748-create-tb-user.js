'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('tb_users', {
      iduser: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      last_name: {
        type: Sequelize.STRING
      },
      dni: {
        type: Sequelize.STRING
      },
      name_user: {
        type: Sequelize.STRING
      },
      pass: {
        type: Sequelize.STRING
      },
      imgurl: {
        type: Sequelize.STRING
      },
      std: {
        type: Sequelize.BOOLEAN
      },
      idprofile: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('tb_users');
  }
};