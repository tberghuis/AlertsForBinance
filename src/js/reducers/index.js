import { combineReducers } from 'redux';
// import pairWatchList from './pairWatchList'
import buyAlertsList from './buyAlertsList';
import sellAlertsList from './sellAlertsList';

export default combineReducers({
	buyAlertsList,
	sellAlertsList
});
