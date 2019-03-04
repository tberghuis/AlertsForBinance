import { combineReducers } from 'redux';

import buyAlertsList from './buyAlertsList';
import sellAlertsList from './sellAlertsList';
import allCurrentPrices from './allCurrentPrices';

export default combineReducers({
	buyAlertsList,
	sellAlertsList,
	allCurrentPrices
});
