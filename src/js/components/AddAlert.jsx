import React from 'react';
import { Button, Container, Divider, Header, Input, Form } from 'semantic-ui-react';

class AddAlert extends React.Component {
	addAlertListClickHandler = () => {
		console.log('clicked');
		console.log('pairing', this.pairing.value);
		console.log('price', this.price.value);
	};

	render() {
		return (
			<React.Fragment>
				<Header as="h1">Add Alert</Header>

				<Form>
					<Form.Field>
						<label>Pairing</label>
						<input ref={(input) => (this.pairing = input)} placeholder="ETHBTC" />
					</Form.Field>
					<Form.Field>
						<label>Price</label>
						<input ref={(input) => (this.price = input)} placeholder="0.1" />
					</Form.Field>
					<Button onClick={this.addAlertListClickHandler}>Add to BUY|SELL alert list</Button>
				</Form>
			</React.Fragment>
		);
	}
}

export default AddAlert;
