
module.exports = {
    PORT : process.env.PORT,
    DB : {
        username: process.env.USER_QA,
        password : process.env.PASSWORD_QA,
        database : process.env.DB_QA,
        host : process.env.HOST_QA,
        dialect: process.env.DIALECT_QA,
        freezeTableName:process.env.FREEZETABLANAME_QA,
        logging:false
    }
};