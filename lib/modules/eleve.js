import { module } from './../implements/module.js';

class eleve extends module{

    async export(format = 'json', parameters=[]){

             let json = await this.connection.connect('http://institutsaintpierresaintpaul28.la-vie-scolaire.fr/vsn.main/dossierRecapEleve/afficheDetailIdentite');  
             if(format === 'json'){
                 return json.data;
             }
             return this.render(json.data, format);
            }
}

export { eleve };