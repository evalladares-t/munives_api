'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class tb_tipo_doc_mun extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      tb_tipo_doc_mun.hasMany(models.tb_doc_mun,{
        foreignKey: 'idtipodocmun',
        as:'tb_doc_mun'
      });
    }
  };
  tb_tipo_doc_mun.init({
    idtipodocmun:{
      type          : DataTypes.INTEGER,
      primaryKey    : true,
      autoIncrement : true,
      comment       :'IDENTIFICADOR UNICO'
    },
    name: {
      type    : DataTypes.STRING,
      comment : "NOMBRE IDENTIFICADOR DEL TIPO DE DOCUMENTO MUNICIPAL"
    },
    rutabase:  { 
      type    : DataTypes.STRING,
      comment : "RUTA BASE DEL TIPO DE DOCUMENTO MUNICIPAL"
    },
    abrev: {
      type    : DataTypes.STRING(10),
      comment : "ABREVIATURA DEL TIPO DE DOCUMENTO"
    },
    nombredoc:{
      type    : DataTypes.STRING(50),
      comment : "NOMBRE DEL TIPO DE DOCUMENTO"
    },
    siglas: {
      type    : DataTypes.STRING(10),
      comment : "SIGLAS DEL TIPO DE DOCUMENTO"
    }
  }, {
    comment: 'TABLA MAESTRO DE LOS TIPOS DE DOCUMENTOS MUNICIPALES DEL SISTEMA',
    freezeTableName: true,
    sequelize,
    modelName: 'tb_tipo_doc_mun',
  });
  return tb_tipo_doc_mun;
};