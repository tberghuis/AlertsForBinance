import React from 'react';
import { Button, Container, Divider, Header, Input, Form } from 'semantic-ui-react';

import AddAlert from './AddAlert';
import AlertsList from './AlertsList';

class App extends React.Component {
	render() {
		return (
			<Container>
				<Header className="centered" as="h1">Alerts for Binance</Header>
				<AddAlert />
				<Divider />
				<AlertsList alertType={"BUY"} />
				<AlertsList alertType={"SELL"} />
			</Container>
		);
	}
}

export default App;
