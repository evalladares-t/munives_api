  
const {Router} = require('express')
const {AuthMiddleware} = require('../../seguridad/middlewares')
const {DocmunController,TipodocmunController} = require('./controllers');

const authMiddleware = new AuthMiddleware();

const docmunController = new DocmunController();
const tipodocmunController = new TipodocmunController();

const router = Router();

const router_docmun = Router();
const router_tipodocmun = Router();

  //Rutas Tipo Documento Municipal
  router_tipodocmun.post('/',tipodocmunController.store.bind(tipodocmunController))
  router_tipodocmun.get('/',tipodocmunController.index.bind(tipodocmunController))
  router_tipodocmun.patch('/:idtipodocmun', docmunController.update.bind(docmunController));
  router_tipodocmun.get('/show', docmunController.show.bind(docmunController));
  router_tipodocmun.use('/*', (req,res)=>{
    res.json({'message':'Recurso no encotrado'})
  });

  //Rutas Documento Municipal
  router_docmun.post('/', docmunController.store.bind(docmunController));
  router_docmun.post('/ingresar_varios', docmunController.store_various.bind(docmunController));
  router_docmun.get('/', docmunController.index.bind(docmunController));
  router_docmun.get('/paginado', docmunController.paginado.bind(docmunController));
  router_docmun.get('/render', docmunController.render.bind(docmunController));
  router_docmun.get('/listaxano', docmunController.listaxano.bind(docmunController));
  router_docmun.patch('/:iddocmun', docmunController.update.bind(docmunController));
  router_docmun.get('/show', docmunController.show.bind(docmunController));
      
  router_docmun.use('/*', (req,res)=>{
          res.json({'message':'Recurso no encotrado'})
    });

    router.use('/docmun',/*authMiddleware.validate ,*/router_docmun);
    router.use('/tipodocmun',/*authMiddleware.validate ,*/router_tipodocmun);

module.exports = router;
