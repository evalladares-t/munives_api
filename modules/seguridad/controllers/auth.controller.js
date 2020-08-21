//const {MenuDTO} = require('../dtos');
const jwt = require('jsonwebtoken');
const mapper = require('automapper-js');

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
        const result = await this._userService.login(name_user,pass);
        if(result.entity!=null){  
            if(!result.validate){
                res.json({
                    'success': false,
                    'message': 'Contraseña incorrecta',
                })
            }
            else{
                var token = jwt.sign( result.entity.iduser, process.env.JWT_SECRET);
                const user= await this._userService.show(result.entity.iduser);
                //const menu = await this._menuService.index();
                const menu = await this._menuService.index(0, 20);
                //console.log(menu)
                let rowsmenu = menu.rows;
                //const count = result.count;
                rowsmenu = rowsmenu.map(rowsmenu=> mapper(this._menuDTO,rowsmenu));
                var nolimpio = [];
                var limpio = [];
                var padre =[];
                
                rowsmenu.forEach(element => {
                    if(element.owner!=null){
                        nolimpio.push(element)
                    }
                    else{
                        limpio.push(element);
                    }
                });
                
                for(var i=0;i<limpio.length;i++){
                    padre[i] = limpio[i];
                    padre[i].children=[]
                    var xx=0;
                    for(var j=0; j<nolimpio.length;j++){
                        if(limpio[i].idmenu===nolimpio[j].owner){
                            console.log(xx)
                            padre[i].children[xx]=nolimpio[j];
                            xx++;
                        }
                    }
                }

                const permission = await this._permissionService.showdep(result.entity.idprofile);
                delete user.pass;
                const emit = {"token":token}
                await this._userService.update(result.entity.iduser,emit);
                res.json({
                    'success': true,
                    'message': 'Usuario correcto',
                    'user':user,
                    'token':token,
                    'menu':padre,
                    'permission':permission
                    
                    
                })
            }
        }
        else{
            res.json({
                'success': false,
                'message': 'Usuario no encontrado',
            }) 
        }
    };
}
module.exports = AuthController;