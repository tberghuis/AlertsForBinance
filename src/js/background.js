import '../img/icon-128.png';
import '../img/icon-34.png';

chrome.browserAction.onClicked.addListener(function(tab) {
    chrome.runtime.openOptionsPage();
});

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
	console.log('request,sender', request, sender);
});
