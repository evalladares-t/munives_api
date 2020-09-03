const db = require('../../../../dal/models');
const mapper = require('automapper-js');
const fs = require('fs');
const { OK,CREATED, NOT_FOUND } = require('http-status-codes');
const {ConvcasDTO,FeErrataDTO} = require('../dtos')

class ConvcasController{


    store_various(req,res){
        const {body} = req;
        
        body.data.reverse().forEach( async result => {
            result.ano=body.ano;
            result.number=parseInt(result.number);
            result.number=((result.number<10)&&(result.number>0))?'00'+result.number:
                            ((result.number>=10)&&(result.number<100))?'0'+result.number:''+result.number;
            
            await db["tb_conv_cas"].create(result);   
            let buscador = await db["tb_conv_cas"].findOne({
                where:[{number:result.number},{ano:result.ano}]});

            result.fe_errata.forEach( async result2 => {
                if(result2.fe_errata_enl!=null){
                    result2.idconvcas = buscador.idconvcas;
                    result2.recurso=result2.fe_errata_enl;
                    console.log(result2)
                    await db["tb_fe_errata"].create(result2);   
                }
            })   
        });

        const message = 'Se agregó '+body.data.length+ ' registros con éxito';

        return res.status(OK).json({
            'success': true,
            message
        })
    }

    async render_conv(req,res){
        const {recurso} = req.params;
        let result = await db["tb_conv_cas"].findOne({
            where:{'convocatoria':'conv/'+recurso},
            include:[{model:db["tb_fe_errata"],as:"tb_fe_errata"}]})

        console.log(result)

        if(result!=null){

            const convcas = mapper(ConvcasDTO,result.toJSON());                
            var filePath = "resources/web/convocatorias-cas/"+convcas.ano+"/conv/"+recurso;
                                                
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

    async render_eval(req,res){
        const {recurso} = req.params;
        let result = await db["tb_conv_cas"].findOne({
            where:{'eval_curricular':'eval/'+recurso},
            include:[{model:db["tb_fe_errata"],as:"tb_fe_errata"}]})

        console.log(recurso)

        if(result!=null){

            const evalcu = mapper(ConvcasDTO,result.toJSON());                
            var filePath = "resources/web/convocatorias-cas/"+evalcu.ano+"/eval/"+recurso;
                                                
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


    async fe_errata(req,res){
        const {recurso} = req.params;
        let result = await db["tb_fe_errata"].findOne({
            where:{'recurso':'feerrata/'+recurso},
            include:[{model:db["tb_conv_cas"],as:"tb_conv_cas"}]})
        console.log(result.tb_conv_cas)

        if(result!=null){

            const feerrata = mapper(ConvcasDTO,result.toJSON());                
            var filePath = "resources/web/convocatorias-cas/"+result.tb_conv_cas.ano+"/feerrata/"+recurso;
                                                
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


    async comunicado(req,res){
        const {recurso} = req.params;
        let result = await db["tb_conv_cas"].findOne({
            where:{'comunicado':'com/'+recurso}})
        console.log(result)

        if(result!=null){

            const comuni = mapper(ConvcasDTO,result.toJSON());                
            var filePath = "resources/web/convocatorias-cas/"+comuni.ano+"/com/"+recurso;
               console.log(__dirname+'../../../../../' + filePath)                                 
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
        const {ano} = req.params;

        let result = await db["tb_conv_cas"].findAll({            
            include:[{model:db["tb_fe_errata"],as:"tb_fe_errata"}]               
        });

        result = (result.length!=0?result:null)
        if(result!=null){
            return res.status(OK).render(
                'web_convcas_gen',{result}
            )
        }
        else{
            return res.status(NOT_FOUND).json({
                'success': false,
                'message':'Sin datos encontrados'
            })
        }
    }

}

module.exports = ConvcasController;