'use strict';

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class tb_usuario extends Model {
    
    static associate(models) {

    }
  };
  tb_usuario.init({
    idusuario: {
      type          : DataTypes.INTEGER,
      primaryKey    : true,
      autoIncrement :true,
      comment       :'IDENTIFICADOR UNICO'
    },
    name:{ 
      type      : DataTypes.STRING(50),
      comment   :'NOMBRE DEL USUARIO'
    },
    last_name:{
      type: DataTypes.STRING(50),
      comment:'APELLIDOS DEL USUARIO'
    },
    dni: {
      type: DataTypes.STRING(50),
      comment:'DNI DEL USUARIO'
    },
    name_user: {
      type: DataTypes.STRING(50),
      comment:'NOMBRE DEL ACCESO DE USUARIO'
    },
    pass: {
      type: DataTypes.STRING(70),
      validate: {
        notEmpty:{
            msg: 'El password no puede ir vacío'
        }
      },
      comment:'CONTRASEÑA DEL ACCESO DE USUARIO'
    },
    imgurl: {
      type: DataTypes.STRING(70),
      comment:'DIRECCION URL DE LA FOTO DEL USUARIO'
    },
    state: {
      type: DataTypes.BOOLEAN,
      comment:'ESTADO 1=ACTIVO  0= DESCATIVADO'
    },
    token:{
      type: DataTypes.STRING(100),
      comment:'JWT DEL USUARIO'
    },
    idprofile:{
      type: DataTypes.INTEGER,
      comment:'IDENTIFICADOR DE PROFILE'
    },
  }, {
    comment: 'TABLA MAESTRO DE LOS USUARIOS DEL SISTEMA',
    sequelize,
    freezeTableName: true,
    modelName: 'tb_usuario',
  });

  return tb_usuario;
};