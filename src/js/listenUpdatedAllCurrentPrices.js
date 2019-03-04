const listenUpdatedAllCurrentPrices = (dispatch) => {
	// console.log('dispatch', dispatch);

	chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
		// assume all is good prevents exception in background
		sendResponse();

		// console.log('request,sender', request, sender);
		if (request.updatedAllCurrentPrices) {
			const action = {
				type: 'UPDATE_CURRENT_PRICES',
				payload: request.updatedAllCurrentPrices
			};

			dispatch(action);
		}
	});
};

export default listenUpdatedAllCurrentPrices;
