  
const {Router} = require('express');
const {AuthMiddleware} = require('../../seguridad/middlewares')
const {ConvcasController} = require('./controllers');

const authMiddleware = new AuthMiddleware();
const convcasController = new ConvcasController();

const router = Router();
const router_convcas = Router();

  //Rutas para ConvCas
    //router_convcas.post('/', convcasController.store.bind(convcasController));
    router_convcas.post('/ingresar_varios', authMiddleware.validate, convcasController.store_various.bind(convcasController));
    router_convcas.get('/render/conv/:recurso', convcasController.render_conv.bind(convcasController));
    router_convcas.get('/render/eval/:recurso', convcasController.render_eval.bind(convcasController));
    router_convcas.get('/render/feerrata/:recurso', convcasController.fe_errata.bind(convcasController));
    router_convcas.get('/render/com/:recurso', convcasController.comunicado.bind(convcasController));
    router_convcas.get('/layout', convcasController.layout.bind(convcasController));
    //router_convcas.post('/show', convcasController.show.bind(convcasController));
        
    router_convcas.use('/*', (req,res)=>{
            res.json({'message':'Recurso no encotrado'})
    });

    router.use('/cas',/*authMiddleware.validate ,*/router_convcas);


module.exports = router;
