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
	// console.log('request,sender', request, sender);

	// this is so client does not need to wait till next interval for update on options.html page load
	if (request.getAllCurrentPrices) {
		sendResponse();
		// i should probably catch this promise error
		chrome.runtime.sendMessage({ updatedAllCurrentPrices: allCurrentPrices });
	}
});

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
			allCurrentPrices[pair.symbol] = Number(pair.price);
		});
		// await following so i can catch exception
		await chrome.runtime.sendMessage({ updatedAllCurrentPrices: allCurrentPrices });
	} catch (error) {
		console.log('error', error);
	}
}

getAllCurrentPrices();

setInterval(getAllCurrentPrices, 30000);
