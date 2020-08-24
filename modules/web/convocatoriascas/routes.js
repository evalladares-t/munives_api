  
const {Router} = require('express');
const {AuthMiddleware} = require('../../seguridad/middlewares')
const {ConvcasController} = require('./controllers');

const authMiddleware = new AuthMiddleware();
const convcasController = new ConvcasController();
const router = Router();
const router_convcas = Router();

  //Rutas para Resgdis
    router_convcas.post('/', resgdisController.store.bind(resgdisController));
    router_convcas.post('/ingresar_varios', resgdisController.store_various.bind(resgdisController));
    router_convcas.get('/', resgdisController.index.bind(resgdisController));
    router_convcas.patch('/', resgdisController.update.bind(resgdisController));
    router_convcas.post('/show', resgdisController.show.bind(resgdisController));
        
    router_convcas.use('/*', (req,res)=>{
            res.json({'message':'Recurso no encotrado'})
    });

    router.use('/convcas',/*authMiddleware.validate ,*/router_convcas);


module.exports = router;
