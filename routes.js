const { Router } = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const compression = require('compression');
const router = Router();
const apiRoute = Router();
const SeguridadRoutes = require('./modules/seguridad/routes');
const WebRoutes = require('./modules/web/routes');
apiRoute.use(cors()).use(bodyParser.urlencoded({extended: true})).use(bodyParser.json()).use(compression());

    apiRoute.all('*', function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Content-type,Accept,X-Access-Token,X-Key");
        res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
        res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');        
        next();
    });

    //    apiRoute.use('/seguridad',/* AuthMiddleware.authMiddleware, */SeguridadRoutes);
    apiRoute.use('/seguridad', SeguridadRoutes);
    apiRoute.use('/web', WebRoutes);
    apiRoute.use('/*', (req, res) => {
        res.json({ 'message': 'Recurso no encotrado' })
    });
    
    router.get('/api/v1.0', (req, res) => {
        const { protocol, hostname, url } = req;
        res.json({
            'Login' : `${protocol}://${hostname}:${process.env.PORT}${url}/login`,
            'User': `${protocol}://${hostname}:${process.env.PORT}${url}/user`,
        })
    });

    router.use('/api/v1.0', apiRoute);
    /*router.use('/*', (req, res) => {
        res.json({ 'message': 'Recurso no encotrado' })
    });*/

module.exports = router;
