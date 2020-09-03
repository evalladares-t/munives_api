  
const {Router} = require('express');
const {AuthController} = require('./controllers');
const {AuthMiddleware} = require('./middlewares')

const authController = new AuthController();
const authMiddleware = new AuthMiddleware();
const router = Router();

    
    router.post('/login', authController.login.bind(authController));
    //router.post('/', authController.store.bind(authController));
    router.get('/saludo',authMiddleware.validate ,authController.saludo.bind(authController));
    
    router.use('/*', (req,res)=>{
        res.json({'message':'Recurso no encotrado'})
    });
 

module.exports = router;
