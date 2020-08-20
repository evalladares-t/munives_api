
module.exports = {
    PORT : process.env.PORT,
    DB : {
        username: process.env.USER_DV,
        password : process.env.PASSWORD_DV,
        database : process.env.DB_DV,
        host : process.env.HOST_DV,
        dialect: process.env.DIALECT_DV,
        dialectOptions: {
            "timezone": "Etc/GMT+8"
        },
        //freezeTableName:process.env.FREEZETABLANAME_DV,
        logging:false
    }
};