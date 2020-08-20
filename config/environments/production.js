
module.exports = {
    PORT : process.env.PORT,
    DB : {
        username: process.env.USER_PD,
        password : process.env.PASSWORD_PD,
        database : process.env.DB_PD,
        host : process.env.HOST_PD,
        dialect: process.env.DIALECT_PD,
        freezeTableName:process.env.FREEZETABLANAME_PD,
        logging:false
    }
};