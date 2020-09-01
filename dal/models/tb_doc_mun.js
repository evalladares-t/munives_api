'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class tb_doc_mun extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      tb_doc_mun.belongsTo(models.tb_tipo_doc_mun,{
        foreignKey: 'idtipodocmun',
        as:'tb_tipo_doc_mun'
      });
    }
  };
  tb_doc_mun.init({
    iddocmun: {
      type          : DataTypes.INTEGER,
      primaryKey    : true,
      autoIncrement :true,
      comment       :'IDENTIFICADOR UNICO'
    },
    number:{
      type      : DataTypes.STRING(6),
      comment   : "NUMERO IDENTIFICADOR DEL RECURSO",
      allowNull : true
    },
    name: {
      type    : DataTypes.STRING(80),
      comment : "NOMBRE IDENTIFICADOR DEL RECURSO"
    },
    descripcion: {
      type    : DataTypes.TEXT,
      comment : "DESCRIPCIÓNDEL RECURSO"
    },
    recurso: {
      type    : DataTypes.STRING(25),
      comment : "NOMBRE DEL RECURSO"
    },
    ano: {
      type    : DataTypes.STRING(5),
      comment : "AÑO PERTENECIENTE AL RECURSO"
    },
    idtipodocmun: {
      type    : DataTypes.INTEGER,
      comment : "IDENTIFICADOR DEL TIPO DE DOCUMENTO"
    }
  }, {
    comment: 'TABLA MAESTRO DE LOS DOCUMENTOS MUNICIPALES',
    sequelize,
    freezeTableName: true,
    modelName: 'tb_doc_mun',
  });
  return tb_doc_mun;
};