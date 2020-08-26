const {TipodocmunDTO} = require('../dtos');
const mapper = require('automapper-js');
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

    async index(req,res){
           
        const result = await db["tb_tipo_doc_mun"].findAndCountAll();

        let rows = result.rows;
        const count = result.count;
        rows = rows.map(rows => mapper(TipodocmunDTO,rows));
        
        rows = (rows.length!=0?rows:'No se encontraron datos')
        
        return res.status(OK).json({
            count,
            'data' : rows,
        })
    }

    async update(req,res){
        const {body} = req;
        const {idtipodocmun} = req.params;
        await db["tb_tipo_doc_mun"].update(idtipodocmun,body);

        return res.status(OK).json({
            'success': true,
            'message':'Se actualizo correctamente'            
        })
    }

    async show(req,res){
        const {number,ano} = req.query;
        const result = await this._db["tb_doc_mun"].findOne({where:[{number},{ano}]});
        const result2 = await this._db["tb_tipo_doc_mun"].findOne({where:[{number},{ano}]});
        return res.status(OK).json({
            'success': true,
            result
        })
    }

}

module.exports = tipodocmunController;