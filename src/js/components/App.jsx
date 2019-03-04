import React from 'react';
import { Button, Container, Divider, Header, Input, Form } from 'semantic-ui-react';

import AddAlert from './AddAlert';

class App extends React.Component {
	render() {
		return (
			<Container>
				<AddAlert />
				<Divider />
				<h1>BUY Alerts</h1>
				<Divider />
				<h1>SELL Alerts</h1>
			</Container>
		);
	}
}

export default App;
