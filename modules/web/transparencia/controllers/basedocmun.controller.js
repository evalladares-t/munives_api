const mapper = require('automapper-js');
const fs = require('fs');
const path = require("path");
const {DocmunDTO,TipodocmunDTO} = require('../dtos')
const { OK,CREATED, NOT_FOUND } = require('http-status-codes');

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

        async listaxtipo(req,res){

            let {ano,idtipodocmun}=req.query;            
            const result = await this._db["tb_doc_mun"].findAndCountAll({where:[{ano},{idtipodocmun}]});
    
            let rows = result.rows;
            const count = result.count;
            rows = rows.map(rows => mapper(DocmunDTO,rows))
            
            rows = (rows.length!=0?rows:'No se encontraron datos')
            
            return res.status(OK).json({
                count,
                'data' : rows,
            })
        }

        store_various(req,res){
            const {body} = req;
            console.log(body)
            body.data.reverse().forEach( async result => {
                result.ano=body.ano;
                result.number=parseInt(result.number);
                result.number=((result.number<10)&&(result.number>0))?'00'+result.number:
                                ((result.number>=10)&&(result.number<100))?'0'+result.number:''+result.number;
                result.idtipodocmun=body.idtipodocmun;
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
            result.resource = tipo_docmun.abrev+'.'+result.number+'-'+result.ano.slice(2,4)+'.pdf';

            this._db["tb_docmun"].create(result);

            return res.status(CREATED).json({
                'success': true,
                'message':'Se agregó el registro con éxito'
            })
        }

        async update(req,res){
            const {body} = req;
            const {iddocmun} = req.params;
            await this._db["tb_doc_mun"].update(iddocmun,body);
    
            return res.status(OK).json({
                'success': true,
                'message':'Se actualizo correctamente'            
            })
        }

        async show(req,res){
            const {number,ano,idtipodocmun} = req.query;
            let result = await this._db["tb_doc_mun"].findOne({
                where:[{number},{ano},{idtipodocmun}],
                include:[{model:this._db["tb_tipo_doc_mun"],as:"tb_tipo_doc_mun"}]
            });
            result = (result!=null?mapper(DocmunDTO,result.toJSON()):'No se encontraron datos') 
            return res.status(OK).json({
                'success': true,
                result
            })
        }

        async listaxano(req,res){
            let {ano} = req.query;
            ano=parseInt(ano);
            let result = await this._db["tb_doc_mun"].findAll({where:{ano}});
            result = (result.length!=0?result:'No se encontraron registros')
            return res.status(OK).json({
                'success': true,
                result
            })
        }

        async render(req,res){
            const {recurso} = req.params;

            let result = await this._db["tb_doc_mun"].findOne({
                where:{recurso},
                include:[{model:this._db["tb_tipo_doc_mun"],as:"tb_tipo_doc_mun"}]
            });

            if(result!=null){

                const docmun = mapper(DocmunDTO,result.toJSON());                
                var filePath = docmun.tb_tipo_doc_mun.rutabase+"/"+docmun.ano+"/"+recurso;
                                                    
                fs.readFile(__dirname+'../../../../../' + filePath, function (err,data){
                    res.status(OK).contentType("application/pdf");
                    res.send(data);
                    console.log(err)
                });
            }    

            else{
                result = "No se encontraron datos"
                return res.status(OK).json({
                    'success': true,
                    result
                })
            }
        }

        async layout(req,res){
            const {idtipodocmun} = req.params;

            let result = await this._db["tb_doc_mun"].findAll({
                where:{
                    idtipodocmun
                },                
            });

            let result_type = await this._db["tb_tipo_doc_mun"].findAll({
                where:{
                    idtipodocmun
                },                
            }); 
            result_type=result_type[0];

            result = (result.length!=0?result:null)
            
            if(result!=null){
                return res.status(OK).render(
                    'web_trans_gen',{result,result_type}
                )
            }
            else{
                return res.status(NOT_FOUND).json({
                    'success': false,
                    'message':'Sin datos encontrados'
                })
            }
        }

        async prop(req,res){
            const {idtipodocmun} = req.params;

            let result = await this._db["tb_doc_mun"].findAll({
                where:{
                    idtipodocmun
                },                
            });
            let result_type = await this._db["tb_tipo_doc_mun"].findAll({
                where:{
                    idtipodocmun
                },                
            }); 

            //console.log(result_type)
            result = (result.length!=0?result:'No se encontraron registros')
            //return res.sendfile(__dirname + '/public/views/web_trans_gen.pug');
            return res.status(OK).json(
                result_type
            )
        }
    }


module.exports = basedocmunController;