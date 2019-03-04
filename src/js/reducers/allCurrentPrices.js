const allCurrentPrices = (state = {}, action) => {
	switch (action.type) {
		case 'UPDATE_CURRENT_PRICES':
			// I dont think i need to [...action.payload] as i should be getting a fresh reference
			// will do just to be sure
			return { ...action.payload };
			break;
		default:
			return state;
	}
};

export default allCurrentPrices;
