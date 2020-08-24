const mapper = require('automapper-js');
const { OK,CREATED } = require('http-status-codes');

    class baseController{

        constructor(datatable,db,resourceDTO) {
            this._datatable = datatable;
            this._db = db;
            this._resourceDTO = resourceDTO;
        }

        async index(req,res){
            let {page,limit}=req.query; 
            limit = 0 +  (isNaN(parseInt(limit))?20:parseInt(limit));
            const offset = 0 + (isNaN(parseInt(page)) || parseInt(page)==0 ?0:(parseInt(page)-1)*parseInt(limit));
            
            const result = await this._db[this._datatable].findAndCountAll({offset, limit});
    
            let rows = result.rows;
            const count = result.count;
            const pagesize = Math.ceil(count/limit);
            rows = rows.map(rows => mapper(this._resourceDTO,rows));
            
            rows = (rows.length!=0?rows:'No se encontraron datos')
    
            return res.status(OK).json({
                count,
                'page':parseInt(page),
                pagesize,
                'data' : rows,
            })
        }

        store_various(req,res){
            const {body} = req;
            
            body.data.reverse().asort().forEach( async result => {
                result.ano=body.ano;
                await this._db[this._datatable].create(result);
            });
            const message = 'Se agregó '+body.data.length+ ' registros con éxito';
    
            return res.status(CREATED).json({
                'success': true,
                message
            })
        }

        async store(req,res){
            const {body} = req;
            this._db[this._datatable].create(body);
    
            return res.status(CREATED).json({
                'success': true,
                'message':'Se agregó el registro con éxito'
            })
        }

        async update(req,res){
            const {body} = req;
            const {idresgdis} = req.params;
            await this._db[this._datatable].update(idresgdis,body);
    
            return res.status(201).json({
                'success': true,
                'message':'Se actualizo correctamente'            
            })
        }

        async show(req,res){
            const {number,ano} = req.body;
            const result = await this._db[this._datatable].findOne({where:[{number},{ano}]});
    
            return res.status(201).json({
                'success': true,
                result
            })
        }

    }


module.exports = baseController;