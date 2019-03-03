const axios = require('axios');
const fs = require('fs');

(async function() {
	// console.log('hello world');

	try {
		const res = await axios.get('https://api.binance.com/api/v1/ticker/allPrices');
		// console.log('res.data', res.data);
		let allsymbols = [];

		res.data.map((pairing) => {
			allsymbols.push(pairing.symbol);
		});
		console.log('allsymbols', allsymbols);

		const json = JSON.stringify(allsymbols);

		const allPairings = `
const allPairings = ${json};

export default Object.freeze(allPairings);
        `;

		fs.writeFile('./src/js/constants/allPairings.js', allPairings, (err) => {
			console.log('err', err);
			if (!err) {
				console.log('done');
			}
		});
	} catch (e) {
		console.log(e);
	}

	debugger;
})();
