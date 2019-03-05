import React from 'react';
import { connect } from 'react-redux';
import { Table, Icon } from 'semantic-ui-react';

const AlertsList = (props) => {
	if (props.alertsList.length === 0 || Object.entries(props.allCurrentPrices).length === 0) {
		// TODO replace with loading
		return null;
	}

	const priceChangeNeededColor = props.alertType === 'BUY' ? '#e15241' : '#43aa05';

	// const removeStyle = { padding: '10px', cursor: 'pointer', margin: '-10px' };

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
						const currentPrice = props.allCurrentPrices[alert.pairing];

						const change = +parseFloat((alert.price / currentPrice - 1) * 100).toFixed(2) + '%';

						// TODO find a uniq key...
						// key={alert.pairing}
						return (
							<Table.Row key={alert.uuid}>
								<Table.Cell>{alert.pairing}</Table.Cell>
								<Table.Cell>{alert.price}</Table.Cell>
								<Table.Cell>{currentPrice}</Table.Cell>
								<Table.Cell style={{ color: priceChangeNeededColor }}>{change}</Table.Cell>
								<Table.Cell>
									<Icon name="remove" />
								</Table.Cell>
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
