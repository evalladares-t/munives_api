'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('tb_conv_cas', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      number: {
        type: Sequelize.STRING
      },
      ano: {
        type: Sequelize.STRING
      },
      name: {
        type: Sequelize.STRING
      },
      convocatoria: {
        type: Sequelize.STRING
      },
      comunicado: {
        type: Sequelize.STRING
      },
      eval_curricular: {
        type: Sequelize.STRING
      },
      resultado: {
        type: Sequelize.STRING
      },
      fe_errata_conv: {
        type: Sequelize.STRING
      },
      fe_errata_com: {
        type: Sequelize.STRING
      },
      fe_errata_eva: {
        type: Sequelize.STRING
      },
      fe_errata_res: {
        type: Sequelize.STRING
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
    await queryInterface.dropTable('tb_conv_cas');
  }
};