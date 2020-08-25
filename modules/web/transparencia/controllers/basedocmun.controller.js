const mapper = require('automapper-js');
const multer = require('multer');
const {DocmunDTO,TipodocmunDTO} = require('../dtos')
const { OK,CREATED } = require('http-status-codes');

    class basedocmunController{

        constructor(db) {
            this._db = db;
        }

        async paginado(req,res){
            let {page,limit}=req.query; 
            limit = 0 +  (isNaN(parseInt(limit))?20:parseInt(limit));
            const offset = 0 + (isNaN(parseInt(page)) || parseInt(page)==0 ?0:(parseInt(page)-1)*parseInt(limit));
            
            const result = await this._db["tb_doc_mun"].findAndCountAll({offset, limit});
    
            let rows = result.rows;
            const count = result.count;
            const pagesize = Math.ceil(count/limit);
            rows = rows.map(rows => mapper(DocmunDTO,rows));
            
            rows = (rows.length!=0?rows:'No se encontraron datos')
            
            return res.status(OK).json({
                count,
                'page':parseInt(page),
                pagesize,
                'data' : rows,
            })
        }

        async index(req,res){
           
            const result = await this._db["tb_doc_mun"].findAndCountAll();
    
            let rows = result.rows;
            const count = result.count;
            rows = rows.map(rows => mapper(DocmunDTO,rows)).reduce((r, a) => {
                r[a.ano] = [...r[a.ano] || [], a];
                return r;
              }, {});;
            
            rows = (rows.length!=0?rows:'No se encontraron datos')
            
            return res.status(OK).json({
                count,
                'data' : rows,
            })
        }

        store_various(req,res){
            const {body} = req;
            
            body.data.reverse().forEach( async result => {
                result.ano=body.ano;
                await this._db["tb_doc_mun"].create(result);
            });
            const message = 'Se agregó '+body.data.length+ ' registros con éxito';
    
            return res.status(CREATED).json({
                'success': true,
                message
            })
        }

        async store(req,res){
            const {body} = req;
            const result = body;

            const tipo_docmun = await this._db["tb_tipo_doc_mun"].findOne({where:{idtipodocmun:body.idtipodocmun}});
            
            result.ano=result.ano+'';
            result.name = tipo_docmun.nombredoc + ' N° '+ result.number+'-'+result.ano+' '+ tipo_docmun.siglas;
            result.resource = tipo_docmun.abrev+'.'+result.number+'-'+result.ano.slice(0,2)+'.pdf';

            this._db["tb_docmun"].create(result);

            return res.status(CREATED).json({
                'success': true,
                'message':'Se agregó el registro con éxito'
            })
        }

        async update(req,res){
            const {body} = req;
            const {idresgdis} = req.params;
            await this._db["tb_doc_mun"].update(idresgdis,body);
    
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

        async listaxano(req,res){
            const {ano} = req.query;
            let result = await this._db["tb_doc_mun"].findAll({where:{ano}});
            result = (result.length!=0?result:'No se encontraron registros')
            return res.status(OK).json({
                'success': true,
                result
            })
        }
    }


module.exports = basedocmunController;