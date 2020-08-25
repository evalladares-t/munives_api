const {TipodocmunDTO} = require('../dtos');
const basecontroller = require('./basedocmun.controller')
const db = require('../../../../dal/models');
const { OK,CREATED } = require('http-status-codes');

class tipodocmunController{

    async store(req,res){
        const {body} = req;
        console.log(body)
        await db["tb_tipo_doc_mun"].create(body);
        return res.status(CREATED).json({
            'success': true,
            'message':'Se agregó el registro con éxito'
        })
    }

}

module.exports = tipodocmunController;