import axios from 'axios';

const delay = function() {
	return Math.random() * (1500 - 800) + 200;
}
const userAgent = function() {
	let agents = ["Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36", "Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36", "Mozilla/5.0 (Windows NT 6.3; WOW64; rv:53.0) Gecko/20100101 Firefox/53.0", "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36", "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_5) AppleWebKit/603.2.4 (KHTML, like Gecko) Version/10.1.1 Safari/603.2.4", "Mozilla/5.0 (Windows NT 10.0; WOW64; rv:53.0) Gecko/20100101 Firefox/53.0", "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36", "Mozilla/5.0 (Windows NT 6.1; WOW64; rv:53.0) Gecko/20100101 Firefox/53.0", "Mozilla/5.0 (Windows NT 6.3; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36", "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36", "Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36", "Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:53.0) Gecko/20100101 Firefox/53.0", "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36", "Mozilla/5.0 (Windows NT 6.1; WOW64; Trident/7.0; rv:11.0) like Gecko", "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.12; rv:53.0) Gecko/20100101 Firefox/53.0"];
	return agents[Math.floor(Math.random() * agents.length)];
}
const time = function() {
	var d = new Date();
	return d.getTime();
}
class connection {
	/**
	 * @param {Object} credentials
	 */
	constructor(c = function() {}, url = '', time = 0) {
		this.starting = c;
		this.url = url;
		this.time = time;
	}
	async start(credentials) {
		this.credentials = credentials;
		this.initTime('transition');
		let starting = await this.starting(credentials);
		this.initTime();
		return starting
	}
	async connect(path, data = null, delayy = true, url = true, headers = true, customHeaders = {}) {
		if(!this.checkTime()) {
			await this.start(this.credentials);
		}
		if(delayy) {
			await new Promise(resolve => {
				setTimeout(resolve, delay())
			})
		}
		if(url && typeof this.url === 'string') {
			path = this.url + path;
		}
		var instance = axios.create({
			validateStatus: function(status) {
				return status < 500;
			}
		});
		let header = {};
		header = {
			'User-Agent': this.getAgent()
		};
		if(headers && this.headers) {
			header = Object.assign(header, this.headers);
		}
		if(customHeaders) {
			header = Object.assign(header, customHeaders);
		}
		if(data !== null) {
			try {
				const resp = await instance.post(path, data, {
					headers: header
				});
				return resp
			} catch(err) {
				return null;
			}
		} else {
			try {
				const resp = await instance.get(path, {
					headers: header
				});
				return resp;
			} catch(err) {
				return null;
			}
		}
	}
	checkTime() {
		let current = time();
		if(typeof this.started === 'number' && current - this.started > this.time) {
			return false;
		}
		return true;
	}
	initTime(transition = false) {
		if(transition) {
			return this.started = true;
		}
		this.started = time();
	}
	getLib() {
		return axios;
	}
	getAgent() {
		if(!this.agent) {
			this.agent = userAgent();
			return this.agent;
		}
		return this.agent;
	}
}
export {
	connection
};