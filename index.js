 import {
    lvs
} from './lib/lvs.js';

//you can configure a cred.js file like this:
/* let creds = {
    "login": "",
    "password":"",
    "institut":".la-vie-scolaire.fr"
} */

import {
    creds
}
from './creds.js'

(async () => {
try {

  let api = new lvs(creds);

  let devoirs = await api.get('devoirs');
  

let result = await devoirs.export('json', {from:["10", "03", "2022"], to:["30", "03", "2022"]});
console.log(result);
//console.log(result.activites[0].activiteDocuments);
} catch (error) {
  console.log(error)
} 

})();