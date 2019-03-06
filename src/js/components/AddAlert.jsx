import React from 'react';
import { Button, Container, Divider, Header, Input, Form, Radio } from 'semantic-ui-react';
import { connect } from 'react-redux';
import axios from 'axios';
import uuid from 'uuid/v1';

import AllPairings from '../constants/allPairings';

class AddAlert extends React.Component {
	state = {
		pairingFieldError: false,
		priceFieldError: false,
		alertTypeFieldError: false
	};

	// TODO try catch console log error
	addToAlertsListClickHandler = async () => {
		console.log('clicked');

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

		// validate alertType
		if (!this.state.alertType) {
			formValid = false;
			this.setState({ alertTypeFieldError: true });
		} else {
			this.setState({ alertTypeFieldError: false });
		}

		// return if invalid pairing, price or alertType
		if (!formValid) {
			return;
		}

		const price = Number(this.price.value);
		const currentPrice = this.props.allCurrentPrices[pairingValueUpper];

		if (currentPrice && currentPrice > price) {
			if (this.state.alertType == 'SELL') {
				alert(`Price is already higher (${currentPrice}) so sell now`);
				return;
			}
		} else {
			if (this.state.alertType == 'BUY') {
				alert(`Price is already lower (${currentPrice}) so buy now`);
				return;
			}
		}

		const action = {
			type: this.state.alertType === 'BUY' ? 'BUY_LIST_ADD' : 'SELL_LIST_ADD',
			payload: {
				pairing: pairingValueUpper,
				price,
				uuid: uuid()
			}
		};

		this.props.dispatch(action);
	};

	alertTypeClickHandler = (e, { value }) => {
		this.setState({ alertType: value });
	};

	// TODO calc alertType based on current price
	// priceOnBlur = () => {
	// 	const price = Number(this.price.value);
	// 	if (isNaN(price) || this.price.value == '') {
	// 		return;
	// 	}
	// };

	render() {
		return (
			<React.Fragment>
				<Header as="h2">Add Alert</Header>
				<Form>
					<Form.Field error={this.state.pairingFieldError}>
						<label>Pairing Symbol</label>
						<input ref={(input) => (this.pairing = input)} placeholder="e.g. ETHBTC" />
					</Form.Field>
					<Form.Field error={this.state.priceFieldError}>
						<label>Price</label>
						<input ref={(input) => (this.price = input)} placeholder="e.g. 0.1" />
					</Form.Field>
					<Form.Field error={this.state.alertTypeFieldError}>
						<Radio
							label="Buy"
							name="radioGroup"
							value="BUY"
							checked={this.state.alertType === 'BUY'}
							onChange={this.alertTypeClickHandler}
						/>
						<Radio
							label="Sell"
							name="radioGroup"
							value="SELL"
							checked={this.state.alertType === 'SELL'}
							onChange={this.alertTypeClickHandler}
						/>
					</Form.Field>
					<Button onClick={this.addToAlertsListClickHandler}>Add to alerts</Button>
				</Form>
			</React.Fragment>
		);
	}
}

const mapStateToProps = (state) => ({
	allCurrentPrices: state.allCurrentPrices
});

export default connect(mapStateToProps)(AddAlert);
