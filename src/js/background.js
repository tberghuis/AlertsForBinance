import '../img/icon-128.png'
import '../img/icon-34.png'


chrome.browserAction.onClicked.addListener(function(tab) {
    

    chrome.tabs.create({'url': chrome.extension.getURL('popup.html'), 'selected': true});
});
