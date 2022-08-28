import { format } from './../implements/format.js';

class csv extends format{

    parse(json, formater){
        return json;
}
}

export { csv };