const sellAlertsList = (state = [], action) => {
	switch (action.type) {
		case 'SELL_LIST_ADD':
			return [ ...state, action.payload ];
			break;
		default:
			return state;
	}
};

export default sellAlertsList;
