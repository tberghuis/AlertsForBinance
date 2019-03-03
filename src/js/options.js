// use the cdn instead
// import 'semantic-ui-css/semantic.min.css'



import '../css/options.css';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import rootReducer from './reducers';
import App from './components/App';
import devToolsEnhancer from 'remote-redux-devtools';

const store = createStore(rootReducer, devToolsEnhancer());

render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById('app-container')
);

////////////////////////////////////////////////////////////////////////

// chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
// 	console.log('request,sender', request, sender);
// });

// chrome.runtime.sendMessage({ greeting: 'hello' }, function(response) {
// 	console.log(response);
// });

// setTimeout(() => {
// 	chrome.runtime.sendMessage({ greeting: 'hello' }, function(response) {
// 		console.log(response);
// 	});
// }, 10000);


// function hello_world() {
// 	console.log('can this be called from background script?');
// }

// chrome.storage.onChanged.addListener(function(changes, namespace) {
// 	for (var key in changes) {
// 		var storageChange = changes[key];
// 		console.log(
// 			'Storage key "%s" in namespace "%s" changed. ' + 'Old value was "%s", new value is "%s".',
// 			key,
// 			namespace,
// 			storageChange.oldValue,
// 			storageChange.newValue
// 		);
// 	}
// });
