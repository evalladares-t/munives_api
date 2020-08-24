const {ResogaDTO} = require('../dtos');
const basecontroller = require('./base.controller')
const db = require('../../../../dal/models');

const datatable = "tb_resgdis"

class ResogaController extends basecontroller{

    constructor() {
        super(datatable,db,ResogaDTO)
    }

}

module.exports = ResogaController;