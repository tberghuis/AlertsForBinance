import React from 'react';
import { Button, Container, Divider, Header, Input, Form } from 'semantic-ui-react';

import AddAlert from './AddAlert';

class App extends React.Component {
	render() {
		return (
			<Container>
				<AddAlert />
				<Divider />
			</Container>
		);
	}
}

export default App;
