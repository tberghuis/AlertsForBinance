// stuff pure functions....

// TODO also implement in sell reducer

function persistBuyAlerts(state) {
	// i am assuming this side effect is only run in background script
	chrome.storage.local.set({ buyAlerts: state }, function() {
		// console.log('local.set.buyAlerts', state);
	});
}

const buyAlertsList = (state = [], action) => {
	let newState = [];
	switch (action.type) {
		// TODO
		case 'BUY_LIST_REPLACE':
			return [ ...action.payload ];
			break;
		case 'BUY_LIST_ADD':
			newState = [ ...state, action.payload ];
			persistBuyAlerts(newState);
			return newState;
			break;
		case 'BUY_LIST_REMOVE':
			newState = state.filter((alert) => alert.uuid !== action.uuid);
			persistBuyAlerts(newState);
			return newState;
			break;
		default:
			return state;
	}
};

export default buyAlertsList;
