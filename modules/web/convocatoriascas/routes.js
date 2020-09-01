  
const {Router} = require('express');
const {AuthMiddleware} = require('../../seguridad/middlewares')
const {ConvcasController} = require('./controllers');

const authMiddleware = new AuthMiddleware();
const convcasController = new ConvcasController();
const router = Router();
const router_convcas = Router();

  //Rutas para ConvCas
    router_convcas.post('/', convcasController.store.bind(convcasController));
    router_convcas.post('/ingresar_varios', convcasController.store_various.bind(convcasController));
    router_convcas.get('/', convcasController.index.bind(convcasController));
    router_convcas.patch('/', convcasController.update.bind(convcasController));
    router_convcas.post('/show', convcasController.show.bind(convcasController));
        
    router_convcas.use('/*', (req,res)=>{
            res.json({'message':'Recurso no encotrado'})
    });

    router.use('/convcas',/*authMiddleware.validate ,*/router_convcas);


module.exports = router;
