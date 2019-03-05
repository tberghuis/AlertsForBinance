import React from 'react';
import { connect } from 'react-redux';
import { Table } from 'semantic-ui-react';

const AlertsList = (props) => {
	if (props.alertsList.length === 0 || Object.entries(props.allCurrentPrices).length === 0 ) {
		// TODO replace with loading
		return null;
	}

	return (
		<React.Fragment>
			<h1>{props.alertType} Alerts</h1>

			<Table unstackable celled>
				<Table.Header>
					<Table.Row>
						<Table.HeaderCell>Pairing</Table.HeaderCell>
						<Table.HeaderCell>Target Price</Table.HeaderCell>
						<Table.HeaderCell>Current Price</Table.HeaderCell>
						<Table.HeaderCell>% change needed</Table.HeaderCell>
						<Table.HeaderCell>Remove Alert</Table.HeaderCell>
						<Table.HeaderCell>Trade</Table.HeaderCell>
					</Table.Row>
				</Table.Header>

				<Table.Body>
					{props.alertsList.map((alert) => {
						return (
							<Table.Row key={alert.pairing}>
								<Table.Cell>{alert.pairing}</Table.Cell>
								<Table.Cell>{alert.price}</Table.Cell>
								<Table.Cell>{props.allCurrentPrices[alert.pairing]}</Table.Cell>
								<Table.Cell>Cell</Table.Cell>
								<Table.Cell>Cell</Table.Cell>
								<Table.Cell>Cell</Table.Cell>
							</Table.Row>
						);
					})}
				</Table.Body>
			</Table>
		</React.Fragment>
	);
};

const mapStateToProps = (state, ownProps) => {
	const alertsList = ownProps.alertType === 'BUY' ? state.buyAlertsList : state.sellAlertsList;

	return {
		alertsList,
		allCurrentPrices: state.allCurrentPrices
	};

	// if (ownProps.alertType === 'BUY') {
	// 	return { alertsList: state.buyAlertsList };
	// }
	// return { alertsList: state.sellAlertsList };
};

export default connect(mapStateToProps)(AlertsList);
