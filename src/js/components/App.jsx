import React from 'react';
import { Button, Container, Divider, Header, Input, Form } from 'semantic-ui-react';

import AddAlert from './AddAlert';
import AlertsList from './AlertsList';

class App extends React.Component {
	render() {
		return (
			<Container>
				<AddAlert />
				<Divider />
				<AlertsList alertType={"BUY"} />
				<Divider />
				<AlertsList alertType={"SELL"} />
			</Container>
		);
	}
}

export default App;
