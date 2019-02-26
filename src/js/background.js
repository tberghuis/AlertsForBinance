import '../img/icon-128.png';
import '../img/icon-34.png';

import 'chrome-extension-async';

chrome.browserAction.onClicked.addListener(function(tab) {
	chrome.runtime.openOptionsPage();
});

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
	console.log('request,sender', request, sender);
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


setTimeout(async () => {
	try {
        await chrome.storage.local.set({ key: "ffff" });
		// chrome.storage.sync.set({ key: 'value' }, function() {
		// 	console.log('Value is set to ' + 'value');
		// });
	} catch (e) {
		console.log('error', e);
	}
}, 10000);



