// import '../img/icon-128.png';
// import '../img/icon-34.png';
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
		res.data.forEach((pair) => {
			allCurrentPrices[pair.symbol] = Number(pair.price);
		});

		store.dispatch({
			type: 'UPDATE_CURRENT_PRICES',
			payload: allCurrentPrices
		});

		processAlertLists();
	} catch (error) {
		console.log('error', error);
	}
}

getAllCurrentPrices();
// TODO user configure polling time, set min limit of 10 secs.
setInterval(getAllCurrentPrices, 30000);

// hydrate store from local storage
chrome.storage.local.get([ 'buyAlerts' ], function(result) {
	if (!result.buyAlerts) {
		return;
	}
	store.dispatch({
		type: 'BUY_LIST_REPLACE',
		payload: result.buyAlerts
	});
});

chrome.storage.local.get([ 'sellAlerts' ], function(result) {
	if (!result.sellAlerts) {
		return;
	}
	store.dispatch({
		type: 'SELL_LIST_REPLACE',
		payload: result.sellAlerts
	});
});

// window.store = store;

function processAlertLists() {
	const state = store.getState();
	state.buyAlertsList.forEach((alert) => {
		if (state.allCurrentPrices[alert.pairing] < alert.price) {
			const notification = new Notification(`Buy Alert - ${new Date().toLocaleTimeString()}`, {
				body: `Pair: ${alert.pairing}, Current Price: ${state.allCurrentPrices[alert.pairing]}`,
				requireInteraction: true
			});
			notification.onclick = function() {
				window.open('https://www.binance.com/trade.html?symbol=' + alert.pairing);
				notification.close();
			};
			store.dispatch({
				type: 'BUY_LIST_REMOVE',
				uuid: alert.uuid
			});
		}
	});

	state.sellAlertsList.forEach((alert) => {
		if (state.allCurrentPrices[alert.pairing] > alert.price) {
			const notification = new Notification(`Sell Alert - ${new Date().toLocaleTimeString()}`, {
				body: `Pair: ${alert.pairing}, Current Price: ${state.allCurrentPrices[alert.pairing]}`,
				requireInteraction: true
			});
			notification.onclick = function() {
				window.open('https://www.binance.com/trade.html?symbol=' + alert.pairing);
				notification.close();
			};
			store.dispatch({
				type: 'SELL_LIST_REMOVE',
				uuid: alert.uuid
			});
		}
	});
}
