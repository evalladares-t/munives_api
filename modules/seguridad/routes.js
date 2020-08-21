  
const {Router} = require('express');
const {AuthController, UserController} = require('./controllers');

const authController = new AuthController();
const userController = new UserController();
const router = Router();

    router.get('/', authController.saludo.bind(authController));
    router.get('/:iduser', userController.showdep.bind(userController));
    
    router.use('/*', (req,res)=>{
        res.json({'message':'Recurso no encotrado'})
    });
 

module.exports = router;
