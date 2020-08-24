'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class tb_resoga extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  tb_resoga.init({
    idresoga: {
      type          : DataTypes.INTEGER,
      primaryKey    : true,
      autoIncrement :true,
      comment       :'IDENTIFICADOR UNICO'
    },
    number:{
      type      : DataTypes.INTEGER,
      comment   : "NUMERO IDENTIFICADOR DEL RECURSO",
      allowNull : true
    },
    name: {
      type    : DataTypes.STRING,
      comment : "NOMBRE IDENTIFICADOR DEL RECURSO"
    },
    descripcion: {
      type    : DataTypes.TEXT,
      comment : "DESCRIPCIÓNDEL RECURSO"
    },
    recurso: {
      type    : DataTypes.STRING,
      comment : "NOMBRE DEL RECURSO"
    },
    ano: {
      type    : DataTypes.STRING,
      comment : "AÑO PERTENECIENTE AL RECURSO"
    }
  }, {
    freezeTableName: true,
    comment: 'TABLA MAESTRO DE LAS RESOGA',
    sequelize,
    modelName: 'tb_resoga',
  });
  return tb_resoga;
};