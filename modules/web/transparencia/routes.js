  
const {Router} = require('express');
const {AuthMiddleware} = require('../../seguridad/middlewares')
const {ResgdisController,ResogaController} = require('./controllers');

const authMiddleware = new AuthMiddleware();
const resgdisController = new ResgdisController();
const resogaController = new ResogaController();
const router = Router();
const router_resgdis = Router();
const router_resoga = Router();

  //Rutas para Resgdis
    router_resgdis.post('/', resgdisController.store.bind(resgdisController));
    router_resgdis.post('/ingresar_varios', resgdisController.store_various.bind(resgdisController));
    router_resgdis.get('/', resgdisController.index.bind(resgdisController));
    router_resgdis.patch('/', resgdisController.update.bind(resgdisController));
    router_resgdis.post('/show', resgdisController.show.bind(resgdisController));
    
    router_resgdis.use('/*', (req,res)=>{
        res.json({'message':'Recurso no encotrado'})
    });

  //Rutas para Resoga
    router_resoga.post('/', resogaController.store.bind(resogaController));
    router_resoga.post('/ingresar_varios', resogaController.store_various.bind(resogaController));
    router_resoga.get('/', resogaController.index.bind(resogaController));
    router_resoga.patch('/', resogaController.update.bind(resogaController));
    router_resoga.post('/show', resogaController.show.bind(resogaController));
        
    router_resoga.use('/*', (req,res)=>{
            res.json({'message':'Recurso no encotrado'})
      });

    router.use('/resgdis',/*authMiddleware.validate ,*/router_resgdis);
    router.use('/resoga',/*authMiddleware.validate ,*/router_resoga);


module.exports = router;
