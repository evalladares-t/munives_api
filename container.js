const {asClass,createContainer,asFunction,asValue} = require('awilix');

//app start
const StartUp = require('./config/startup');
const Server = require('./config/server');
const config = require('./config/environments');

//Routes
const Routes = require('./routes.js');
const UserRoutes = require('./routes/user.routes');

//Controllers
const { UserController,
    AuthController} = require('./controllers');

//Middleware
const {AuthMiddleware} =require('./middlewares')

//Service
const {UserService} = require('./../services');

//Domain
const {UserBusiness} = require('./../domain');

//Repository
const {UserRepository} = require('./../dal/repositories');

//conf db
const db = require('../dal/models');


const container = createContainer();


container
    .register({
    //App start
        app:asClass(StartUp).singleton(),
        server : asClass(Server).singleton(),
        router : asFunction(Routes).singleton(),
    })
    .register({
        config : asValue(config)
    })
    .register({
        db : asValue(db)
    })
    .register({
    //Api Routes
        UserRoutes : asClass(UserRoutes).singleton(),
    //Api Controller
        AuthController : asClass(AuthController).singleton(),
        UserController : asClass(UserController).singleton()    
    })
    .register({
        //Middleware
            AuthMiddleware : asClass(AuthMiddleware).singleton()
    }) 
    .register({
        //Service
            UserService : asClass(UserService).singleton()
    })    
    .register({
        //Domain
            UserBusiness : asClass(UserBusiness).singleton()
    })
    .register({
        //Repository
            UserRepository : asClass(UserRepository).singleton()
    })


module.exports = container;


