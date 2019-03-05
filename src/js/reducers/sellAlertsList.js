const sellAlertsList = (state = [], action) => {
	switch (action.type) {
		case 'SELL_LIST_ADD':
			return [ ...state, action.payload ];
			break;
		case 'SELL_LIST_REMOVE':
			return state.filter((alert) => alert.uuid !== action.uuid);
			break;
		default:
			return state;
	}
};

export default sellAlertsList;
