import { module } from './../implements/module.js';

class notes extends module{

    async export(format = 'json', parameters=[]){

             let json = await this.connection.connect('http://institutsaintpierresaintpaul28.la-vie-scolaire.fr/vsn.main/releveNote/releveNotes');  
             if(format === 'json'){
                 return json;
             }
             return this.render(json, format);
            }
}

export { notes };