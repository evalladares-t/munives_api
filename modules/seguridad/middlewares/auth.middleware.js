const jwt = require('jsonwebtoken');
const {UserDTO} = require('../dtos');
const mapper = require('automapper-js');
const db = require('../../../dal/models');
const { UNAUTHORIZED } = require('http-status-codes');

class AuthMiddleware{

    validate = async (req, res, next) => {
        const token = req.headers['authorization'] || '';
        if (!token) {
          next(
                res.status(UNAUTHORIZED).json({
                  success:'false',
                  message:'No está autorizado para esta consulta'
            }));
          return;
        }
      
        try {
          const bearerToken = token.split(" ");
          const bearer = jwt.verify(bearerToken[1], process.env.JWT_SECRET);
          let result = await db["tb_usuario"].findOne({where:{idusuario:bearer}});
          
          result = mapper(UserDTO,result.dataValues);
          next();
        } catch (err) {
          next(
            res.status(UNAUTHORIZED).json({
              success:'false',
              message:'No está autorizado para esta consulta'
        }));
        }
      };
}

module.exports = AuthMiddleware;