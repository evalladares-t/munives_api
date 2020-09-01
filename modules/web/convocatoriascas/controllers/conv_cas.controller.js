const db = require('../../../../dal/models');

class ConvcasController{


    store_various(req,res){
        const {body} = req;
        
        body.data.reverse().forEach( async result => {
            result.ano=body.ano;
            result.number=parseInt(result.number);
            result.number=((result.number<=10)&&(result.number>0))?'00'+result.number:
                            ((result.number>10)&&(result.number<100))?'0'+result.number:''+result.number;

            await db["tb_conv_cas"].create(result);

            /*let busqueda = await this._db["tb_conv_cas"].findOne(
                {where:[{number},{ano}]},
                {attributes:{ 'pass' }});
            result = (result!=null?mapper(DocmunDTO,result.toJSON()):'No se encontraron datos') 
*/
            result.fe_errata.forEach( async result2 =>{
                result2.ano = body.ano;
                result2.number = result.number;
                result2.recurso = result.fe_errata_enl;
                result2.idconvcas
                await db["tb_fe_errata"].create(result2);
            }
            )
            
        });
        const message = 'Se agregó '+body.data.length+ ' registros con éxito';

        return res.status(CREATED).json({
            'success': true,
            message
        })
    }

}

module.exports = ConvcasController;