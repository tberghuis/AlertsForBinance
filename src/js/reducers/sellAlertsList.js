function persistSellAlerts(state) {
	chrome.storage.local.set({ sellAlerts: state }, function() {});
}

const sellAlertsList = (state = [], action) => {
	let newState = [];
	switch (action.type) {
		case 'SELL_LIST_REPLACE':
			return [ ...action.payload ];
			break;
		case 'SELL_LIST_ADD':
			newState = [ ...state, action.payload ];
			persistSellAlerts(newState);
			return newState;
			break;
		case 'SELL_LIST_REMOVE':
			newState = state.filter((alert) => alert.uuid !== action.uuid);
			persistSellAlerts(newState);
			return newState;
			break;
		default:
			return state;
	}
};

export default sellAlertsList;
