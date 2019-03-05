import '../img/icon-128.png';
import '../img/icon-34.png';
import 'chrome-extension-async';
import axios from 'axios';

import AllPairings from './constants/allPairings';

let allCurrentPrices = {};

chrome.browserAction.onClicked.addListener(function(tab) {
	chrome.runtime.openOptionsPage();
});

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
	console.log('request,sender', request, sender);
	// if (request.getprice && Object.entries(allCurrentPrices).length !== 0) {
	// 	// const price = allCurrentPrices.find((x) => x.symbol === request.getprice).price;
	// 	// console.log('price', price);
	// 	sendResponse(allCurrentPrices[request.getprice]);
	// }

	// this is so client does not need to wait till next interval for update on options.html page load
	if (request.getAllCurrentPrices) {
		sendResponse();
		getAllCurrentPrices();
	}
});

// If you want to use the same callback you can use Promise syntax too:

// setTimeout(async () => {
// 	try {
// 		await chrome.runtime.sendMessage({ messsage: 'form background' });

// 		// await chrome.storage.sync.set({ key: "value" });

// 		chrome.storage.sync.set({ key: 'value' }, function() {
// 			console.log('Value is set to ' + 'value');
// 		});
// 	} catch (e) {
// 		console.log('error', e);
// 	}
// }, 10000);

// setTimeout(async () => {
// 	try {
//         await chrome.storage.local.set({ key: "ffff" });
// 	} catch (e) {
// 		console.log('error', e);
// 	}
// }, 10000);

async function getAllCurrentPrices() {
	try {
		const res = await axios.get('https://api.binance.com/api/v1/ticker/allPrices');
		res.data.map((pair) => {
			allCurrentPrices[pair.symbol] = pair.price;
		});
		// await following so i can catch exception
		await chrome.runtime.sendMessage({ updatedAllCurrentPrices: allCurrentPrices });
	} catch (error) {
		console.log('error', error);
	}
}

getAllCurrentPrices();

setInterval(getAllCurrentPrices, 30000);
