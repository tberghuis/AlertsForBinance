import '../img/icon-128.png';
import '../img/icon-34.png';
// import 'chrome-extension-async';

import { wrapStore } from 'webext-redux';
import { createStore } from 'redux';
import rootReducer from './reducers';
import devToolsEnhancer from 'remote-redux-devtools';

import axios from 'axios';

import AllPairings from './constants/allPairings';

const store = createStore(rootReducer, devToolsEnhancer());

wrapStore(store);

chrome.browserAction.onClicked.addListener(function(tab) {
	chrome.runtime.openOptionsPage();
});

let allCurrentPrices = {};
async function getAllCurrentPrices() {
	try {
		const res = await axios.get('https://api.binance.com/api/v1/ticker/allPrices');
		res.data.map((pair) => {
			allCurrentPrices[pair.symbol] = Number(pair.price);
		});

		store.dispatch({
			type: 'UPDATE_CURRENT_PRICES',
			payload: allCurrentPrices
		});
		// await following so i can catch exception
		// await chrome.runtime.sendMessage({ updatedAllCurrentPrices: allCurrentPrices });
	} catch (error) {
		console.log('error', error);
	}
}

getAllCurrentPrices();

setInterval(getAllCurrentPrices, 30000);
