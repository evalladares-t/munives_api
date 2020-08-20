const { Router } = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const compression = require('compression');
const router = Router();
const apiRoute = Router();
apiRoute.use(cors()).use(bodyParser.json()).use(compression());

module.exports = function ({ AuthMiddleware,AuthController, UserRoutes}) {

    apiRoute.all('*', function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "X-Requested-With");
        res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
        res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');        
        next();
     });

    apiRoute.post('/login', AuthController.login.bind(AuthController));

    //Rutas generales
    apiRoute.use('/user', AuthMiddleware.authMiddleware, UserRoutes);

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
    router.use('/*', (req, res) => {
        res.json({ 'message': 'Recurso no encotrado' })
    });
    return router;
};