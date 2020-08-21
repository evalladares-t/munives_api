//const container = require('./container');

const app = require('./config/server');
const db = require('./dal/models/');

const application = new app();

application
    .start()
    .then(async () => {
        await db.sequelize.sync();
        console.log('Base de datos conectada')
    })
    .catch(err => {
        console.log(err);
        process.exit();
    });
