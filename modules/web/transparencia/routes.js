  
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
  router_tipodocmun.post('/', authMiddleware.validate , tipodocmunController.store.bind(tipodocmunController))
  router_tipodocmun.get('/',tipodocmunController.index.bind(tipodocmunController))
  router_tipodocmun.patch('/:idtipodocmun', authMiddleware.validate, docmunController.update.bind(docmunController));
  router_tipodocmun.get('/show', docmunController.show.bind(docmunController));
  router_tipodocmun.use('/*', (req,res)=>{
    res.json({'message':'Recurso no encotrado'})
  });

  //Rutas Documento Municipal
  router_docmun.post('/', authMiddleware.validate, docmunController.store.bind(docmunController));
  router_docmun.post('/ingresar_varios', authMiddleware.validate, docmunController.store_various.bind(docmunController));
  router_docmun.get('/', docmunController.index.bind(docmunController));
  router_docmun.get('/listaxtipo', docmunController.listaxtipo.bind(docmunController));
  router_docmun.get('/paginado', docmunController.paginado.bind(docmunController));
  router_docmun.get('/render/:recurso', docmunController.render.bind(docmunController));
  router_docmun.get('/listaxano', docmunController.listaxano.bind(docmunController));
  router_docmun.patch('/:iddocmun', authMiddleware.validate, docmunController.update.bind(docmunController));
  router_docmun.get('/show', docmunController.show.bind(docmunController));
  router_docmun.get('/layout/:idtipodocmun', docmunController.layout.bind(docmunController));
  router_docmun.get('/prop/:idtipodocmun', docmunController.prop.bind(docmunController));
  
  
  router_docmun.use('/*', (req,res)=>{
          res.json({'message':'Recurso no encotrado'})
    });

    router.use('/docmun',/*authMiddleware.validate ,*/router_docmun);
    router.use('/tipodocmun',/*authMiddleware.validate ,*/router_tipodocmun);

module.exports = router;
