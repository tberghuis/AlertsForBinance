const buyAlertsList = (state = [], action) => {
	switch (action.type) {
		case 'BUY_LIST_ADD':
			return [ ...state, action.payload ];
			break;
		default:
			return state;
	}
};

export default buyAlertsList;
