  
const {Router} = require('express');

const TransparenciaRoutes = require('./transparencia/routes');
const ConvCASRoutes = require('./convocatoriascas/routes');
const router = Router();

    
    router.use('/transparencia', TransparenciaRoutes);
    router.use('/convcas', ConvCASRoutes);
    
    
    router.use('/*', (req,res)=>{
        res.json({'message':'Recurso se encotrado'})
    });
 

module.exports = router;
