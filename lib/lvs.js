import {
	connection
}
from './connection.js';
import {
	module
}
from './implements/module.js';
import {
	devoirs
}
from './modules/devoirs.js';
class lvs {
	/**
	 * @param {object} credentials
	 */
	constructor(credentials) {
			this.credentials = credentials;
		}
		/**
		 * @param {string} module
		 */
	async get(mod) {
		//use the require to call the module like this: /require['notes']();
		if(!devoirs instanceof module) {
			throw new Error("method get only accepts objects that extends module");
		}
		if(mod !== 'devoirs') {
			throw new Error("The module is not recognized");
		}
		let connection = await this.getConnection(false, this.credentials.institut);
		return new devoirs(connection);
	}
	async getConnection(restart = false, url = '') {
		if(typeof this.connection === 'object' && restart === false) {
			return this.connection;
		}
		let starting = async function(credentials) {
			await this.connect('/login', null, false, true, false, {
				'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
				'Accept-Language': 'fr,fr-FR;q=0.8,en-US;q=0.5,en;q=0.3',
				'Accept-Encoding': 'gzip, deflate, br',
				'Referer': this.url,
				'DNT': '1',
				'Connection': 'keep-alive',
				'Upgrade-Insecure-Requests': 's1',
				'Cache-Control': 'max-age=0',
            });
            
			const r = await this.connect('/vsn.main/WSAuth/connexion', credentials, true, true, false, {
				'Accept': 'application/json, text/plain, */*',
				'Accept-Language': 'fr,fr-FR;q=0.8,en-US;q=0.5,en;q=0.3',
				'Accept-Encoding': 'gzip, deflate, br',
				'Content-Type': 'text/plain',
				'Origin': this.url,
				'DNT': '1',
				'Referer': this.url + '/login',
				'Connection': 'keep-alive'
			})
			console.log(r);
			this.headers = {
				'Cookie': r.headers['set-cookie']
			}
			await this.connect('/portail/ACCUEIL');
		};
		this.connection = new connection(starting, url, 1200000);
		await this.connection.start(this.credentials);
		return this.connection;
	}
}
export {
	lvs
};