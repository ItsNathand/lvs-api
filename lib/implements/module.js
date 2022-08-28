import {
	format
}
from './format.js';
import {
	csv
}
from './../formats/csv.js';
import {
	connection
}
from './../connection.js';
class module {
	constructor(connection) {
		this.connection = connection;
		if(typeof this.export !== 'function') {
			throw new Error("must implement function export");
		}
	}
	render(json, formater) {
		//use the require to call the module like this:
		//require['csv']();
		if(!csv instanceof format) {
			throw new Error("method get only accepts objects that extends module");
		}
		formater = new csv();
		return formater.parse(json);
	}
	createConnection(starting, url) {
		return new connection(starting, url);
	}
}
export {
	module
};