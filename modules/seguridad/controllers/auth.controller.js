const {UserDTO} = require('../dtos');
const jwt = require('jsonwebtoken');
const mapper = require('automapper-js');
const db = require('../../../dal/models');
const { OK, UNAUTHORIZED } = require('http-status-codes');

class AuthController{

    //pass master : $2b$08$btxTxotTturjDOyUNSKcqede1hYOaOCXzWLxcHstECRx6XuIkdFWu
    //toker master : eyJhbGciOiJIUzI1NiJ9.MQ.fGaUARI99DDadCuNm4ZUhaB6Bpx8KiJsnCLTisJ0bp4

    saludo (req,res){
        res.json({
            'message':'Valladares llegaste'
        })
    }
    

    async login (req, res) {
        const { name_user, pass } = req.body;
        let result = await db["tb_user"].findOne({where:{name_user}});
        if(result!=null){
            const usuario = mapper(UserDTO,result.dataValues);
            if(usuario.pass!=pass){
                res.status(UNAUTHORIZED).json({
                    'success': false,
                    'message': 'Contraseña incorrecta',
                })
            }
            else{
                var token = jwt.sign( usuario.iduser, process.env.JWT_SECRET);
                const emit = {"token":token}
                await db["tb_user"].update(emit,{ where: { iduser:usuario.iduser }});
                res.status(OK).json({
                    'success': true,
                    'message': 'Usuario correcto',
                    usuario,
                    token
                })
            }
            
        }
        else{
            res.status(UNAUTHORIZED).json({
                'success': false,
                'message': 'Usuario no encontrado',
            }) 
        }
    };
}
module.exports = AuthController;