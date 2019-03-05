const buyAlertsList = (state = [], action) => {
	switch (action.type) {
		case 'BUY_LIST_ADD':
			return [ ...state, action.payload ];
			break;
		case 'BUY_LIST_REMOVE':
			return state.filter(alert => alert.uuid !== action.uuid);
			break;
		default:
			return state;
	}
};

export default buyAlertsList;
