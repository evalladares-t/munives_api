const container = require('./container');

const application = container.resolve("app");
const db = container.resolve("db");

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
