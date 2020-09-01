'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class tb_conv_cas extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      tb_conv_cas.hasMany(models.tb_fe_errata,{
        foreignKey: 'idconvcas',
        as:'tb_fe_errata'
      });
    }
  };
  tb_conv_cas.init({
    idconvcas: {
      type          : DataTypes.INTEGER,
      primaryKey    : true,
      autoIncrement :true,
      comment       :'IDENTIFICADOR UNICO'
    },
    number:{
      type      : DataTypes.STRING(6),
      comment   : "NUMERO IDENTIFICADOR DE LA CONVOCATORIA",
      allowNull : true
    },
    ano: {
      type    : DataTypes.STRING(5),
      comment : "AÑO PERTENECIENTE AL RECURSO"
    },
    name: {
      type    : DataTypes.STRING(80),
      comment : "NOMBRE DE LA CONVOCATORIA"
    },
    convocatoria: {
      type    : DataTypes.STRING(80),
      comment : "CONVOCATORIA EN GESTION"
    },
    comunicado: {
      type    : DataTypes.STRING(80),
      comment : "NOMBRE IDENTIFICADOR DEL RECURSO"
    },
    eval_curricular:{
      type    : DataTypes.STRING(80),
      comment : "EVALUACION DE LA CONVOCATORIA"
    },
    resultado: {
      type    : DataTypes.STRING(80),
      comment : "RESULTADO DE LA CONVOCATORIA"
    },
  }, {
    sequelize,
    comment: 'TABLA MAESTRO DE LAS CONVOCATORIAS MUNICIPALES',
    freezeTableName: true,
    modelName: 'tb_conv_cas',
  });
  return tb_conv_cas;
};