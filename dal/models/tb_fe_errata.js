'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class tb_fe_errata extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      tb_fe_errata.belongsTo(models.tb_conv_cas,{
        foreignKey: 'idconvcas',
        as:'tb_conv_cas'
      });
    }
  };
  tb_fe_errata.init({
    idfeerrata: {
      type          : DataTypes.INTEGER,
      primaryKey    : true,
      autoIncrement :true,
      comment       :'IDENTIFICADOR UNICO'
    },
    number: {
      type      : DataTypes.STRING(80),
      comment   : "NUMERO DE LA CONVOCATORIA CAS",
      allowNull : true
    },
    ano: {
      type      : DataTypes.STRING(80),
      comment   : "ANO DE LA CONVOCATORIA CAS",
      allowNull : true
    },
    idconvcas: {
      type      : DataTypes.INTEGER,
      comment   : "IDENTIFICADOR DE LA CONVOCATORIA CAS",
      allowNull : true
    },
    recurso:  {
      type      : DataTypes.STRING(80),
      comment   : "NOMBRE DEL RECURSO",
      allowNull : true
    },
  }, {
    comment: 'TABLA MAESTRO DE LAS FE ERRATAS',
    sequelize,
    freezeTableName: true,
    modelName: 'tb_fe_errata',
  });
  return tb_fe_errata;
};