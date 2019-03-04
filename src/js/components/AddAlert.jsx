import React from 'react';
import { Button, Container, Divider, Header, Input, Form } from 'semantic-ui-react';
import { connect } from 'react-redux';
import axios from 'axios';

import AllPairings from '../constants/allPairings';

class AddAlert extends React.Component {
	state = {
		pairingFieldError: false,
		priceFieldError: false
	};

	// TODO try catch console log error
	addAlertListClickHandler = async () => {
		console.log('clicked');
		// console.log('AllPairings', AllPairings);
		// console.log('pairing', this.pairing.value);
		// console.log('price', this.price.value);
		// console.log('price', parseFloat(this.price.value));

		let formValid = true;

		// validate price
		if (isNaN(parseFloat(this.price.value))) {
			this.setState({ priceFieldError: true });
			formValid = false;
		} else {
			this.setState({ priceFieldError: false });
		}

		// validate pairing
		let pairingValueUpper = this.pairing.value.toUpperCase();
		if (AllPairings.indexOf(pairingValueUpper) === -1) {
			this.setState({ pairingFieldError: true });
			formValid = false;
		} else {
			this.setState({ pairingFieldError: false });
		}

		// return if invalid pairing or price
		if (!formValid) {
			return;
		}

		const action = {
			payload: {
				pairing: pairingValueUpper
			}
		};
		action.payload.price = await chrome.runtime.sendMessage({ getprice: pairingValueUpper });

		if (action.payload.price < this.price.value) {
			action.type = 'BUY_LIST_ADD';
		} else {
			action.type = 'SELL_LIST_ADD';
		}

		this.props.dispatch(action);

		// send message to background and other open tabs
		// save to local storage
		// dispatch redux action


		// console.log('this.props.dispatch', this.props.dispatch);
	};

	render() {
		return (
			<React.Fragment>
				<Header as="h1">Add Alert</Header>

				<Form>
					<Form.Field error={this.state.pairingFieldError}>
						<label>Pairing</label>
						<input ref={(input) => (this.pairing = input)} placeholder="ETHBTC" />
					</Form.Field>
					<Form.Field error={this.state.priceFieldError}>
						<label>Price</label>
						<input ref={(input) => (this.price = input)} placeholder="0.1" />
					</Form.Field>
					<Button onClick={this.addAlertListClickHandler}>Add to alert list</Button>
				</Form>
			</React.Fragment>
		);
	}
}

export default connect()(AddAlert);
