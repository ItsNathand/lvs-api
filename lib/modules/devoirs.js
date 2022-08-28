import {
	module
}
from './../implements/module.js';
class devoirs extends module {
	async export(format = 'json', parameters = {}) {
		await this.serverConnect();
		let debut = parameters.from;
		let fin = parameters.to;
		let res = await this.serverConnection.connect('/rechercheActivite/rechercheJournaliere' + this.serverConnection.token + '', 
																									
		"params=%7B%22start%22%3A0%2C%22limit%22%3A100%2C%22contexteId%22%3A-1%2C%22typeId%22%3A-1%2C%22cdtId%22%3A-1%2C%22matiereId%22%3A-1%2C%22groupeId%22%3A-1%2C%22dateDebut%22%3A%22"+ debut[0] +"%2F"+ debut[1] +"%2F"+ debut[2] +"%22%2C%22dateFin%22%3A%22"+fin[0]+"%2F"+fin[1]+"%2F"+fin[2]+"%22%2C%22actionRecherche%22%3Atrue%2C%22activeTab%22%3A%22idlisteTab%22%7D&xaction=read",
		false, true, true, {
			'Accept': 'application/json, text/plain, */*',
			'Accept-Language': 'fr,fr-FR;q=0.8,en-US;q=0.5,en;q=0.3',
			'Accept-Encoding': 'gzip, deflate, br',
			'Origin': this.serverConnection.url,
			'DNT': '1',
			'X-Requested-With': 'XMLHttpRequest',
			'Referer': 'https://ent05.la-vie-scolaire.fr/eliot-textes/rechercheActivite/index',
			'Connection': 'keep-alive'
		});
		console.log(res);
		console.log("params=%7B%22start%22%3A0%2C%22limit%22%3A100%2C%22contexteId%22%3A-1%2C%22typeId%22%3A-1%2C%22cdtId%22%3A-1%2C%22matiereId%22%3A-1%2C%22groupeId%22%3A-1%2C%22dateDebut%22%3A%22"+ debut[0] +"%2F"+ debut[1] +"%2F"+ debut[2] +"%22%2C%22dateFin%22%3A%22"+fin[0]+"%2F"+fin[1]+"%2F"+fin[2]+"%22%2C%22actionRecherche%22%3Atrue%2C%22activeTab%22%3A%22idlisteTab%22%7D&xaction=read");
		
	//	let res = await this.serverConnection.connect('/fichier/afficherFichier' + this.serverConnection.token + '?fichierId=1292425');
	console.log('https://ent05.la-vie-scolaire.fr/eliot-textes/fichier/afficherFichier' + this.serverConnection.token + '?fichierId=1292425');	
	return res.data;
	}
	async serverConnect() {
		let the = this;
		let getUrl = async function() {
			await the.connection.connect('/portail/CDT', null, true, true, true, {
				'Accept': 'application/json, text/plain, */*',
				'Accept-Language': 'fr,fr-FR;q=0.8,en-US;q=0.5,en;q=0.3',
				'Accept-Encoding': 'gzip, deflate, br',
				'Origin': the.connection.url,
				'DNT': '1',
				'Connection': 'keep-alive'
			});
			let url = await the.connection.connect('/vsn.main/WSMenu/getModuleUrl?mod=CDT&minuteEcartGMTClient=-120&add=123', false, true, true, {
				'Accept': 'application/json, text/plain, */*',
				'Accept-Language': 'fr,fr-FR;q=0.8,en-US;q=0.5,en;q=0.3',
				'Accept-Encoding': 'gzip, deflate, br',
				'Content-Type': 'text/plain',
				'Origin': the.connection.url,
				'DNT': '1',
				'Referer': the.connection.url + '/portail/CDT',
				'Connection': 'keep-alive'
			});
			return url.data.location;
		}
		let starting = async function(url) {
			
			let r = await this.connect(url, null, false, false);
			let c = r;
			c = c.headers.location;
			console.log(c);
			console.log(c);
			let debut = c.indexOf(';');
			let end = c.indexOf('?');
			this.token = c.substring(debut, end);
		};
		let d = this.createConnection(starting, 'https://ent05.la-vie-scolaire.fr/eliot-textes', 1200000);
		console.log(await getUrl());
		await d.start(await getUrl());
		return this.serverConnection = d;
	}
}
export {
	devoirs
};