const db = require('../../../../dal/models');
const basedocmunController = require('./basedocmun.controller');


class ResgdisController extends basedocmunController{

    constructor() {
        super(db)
    }


}

module.exports = ResgdisController;