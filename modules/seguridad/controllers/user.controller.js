
const {UserDTO} = require('../dtos');
const mapper = require('automapper-js');
const db = require('../../../dal/models');

class UserController{

    async showdep(req,res){
        const {iduser} = req.params;
        let result = await db["tb_usuario"].findOne({where:{iduser}});
        
        if(!result){
            res.json({'message':'Sin datos a mostrar'})
        }    
        else{
            const usuario = mapper(UserDTO,result.dataValues);
            return res.json({
                usuario
            })
        }            
    }

    
}

module.exports = UserController;