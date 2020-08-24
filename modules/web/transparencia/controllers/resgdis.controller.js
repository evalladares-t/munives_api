const {ResgdisDTO} = require('../dtos');
const basecontroller = require('./base.controller')
const db = require('../../../../dal/models');

const datatable = "tb_resgdis"

class ResgdisController extends basecontroller{

    constructor() {
        super(datatable,db,ResgdisDTO)
    }


}

module.exports = ResgdisController;