// use the cdn instead
// import 'semantic-ui-css/semantic.min.css'
import '../css/options.css';
// import 'chrome-extension-async';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import rootReducer from './reducers';
import App from './components/App';
import { Store } from 'webext-redux';

const store = new Store({
	state: {
		buyAlertsList: [],
		sellAlertsList: [],
		allCurrentPrices: {}
	}
});

// window.store = store;

render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById('app-container')
);
