const express = require('express');
const routes = require('../routes')
const config = require('./environments')

class Server{

    constructor(config,routes) {
        this._config = config;
        this._routes = routes;
        this._express = express();
        this._express.use(require('../routes'));        
        //this._express.use(cors());
    }

    start(){
        return new Promise((resolve, reject) => {
            const http = this._express.listen(config.PORT, () =>{
                const {port} = http.address();
                console.log('Aplication running on port : ' + port);
                resolve();
            })
        })
    }
}

module.exports = Server;