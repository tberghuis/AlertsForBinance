import React from 'react';
import { connect } from 'react-redux';
import { Header, Table, Icon } from 'semantic-ui-react';

const AlertsList = (props) => {
	if (props.alertsList.length === 0 || Object.entries(props.allCurrentPrices).length === 0) {
		return null;
	}

	const priceChangeNeededColor = props.alertType === 'BUY' ? '#e15241' : '#43aa05';
	const priceChangeStyle = { color: priceChangeNeededColor };

	return (
		<React.Fragment>
			<Header as="h2">{props.alertType} Alerts</Header>

			<Table unstackable celled>
				<Table.Header>
					<Table.Row>
						<Table.HeaderCell>Pairing</Table.HeaderCell>
						<Table.HeaderCell>Target Price</Table.HeaderCell>
						<Table.HeaderCell>Current Price</Table.HeaderCell>
						<Table.HeaderCell>% Change Needed</Table.HeaderCell>
						<Table.HeaderCell>Remove Alert</Table.HeaderCell>
						<Table.HeaderCell>Trade</Table.HeaderCell>
					</Table.Row>
				</Table.Header>

				<Table.Body>
					{props.alertsList.map((alert) => {
						const currentPrice = props.allCurrentPrices[alert.pairing];

						const change = +parseFloat((alert.price / currentPrice - 1) * 100).toFixed(2) + '%';

						return (
							<Table.Row key={alert.uuid}>
								<Table.Cell>{alert.pairing}</Table.Cell>
								<Table.Cell>{alert.price}</Table.Cell>
								<Table.Cell>{currentPrice}</Table.Cell>
								<Table.Cell style={priceChangeStyle}>{change}</Table.Cell>
								<Table.Cell>
									<span
										className="big-link"
										onClick={() => {
											props.dispatch({
												type: props.alertType + '_LIST_REMOVE',
												uuid: alert.uuid
											});
										}}
									>
										<Icon name="remove" />
									</span>
								</Table.Cell>
								<Table.Cell>
									<a
										className="big-link"
										target="_blank"
										rel="noopener noreferrer"
										href={'https://www.binance.com/trade.html?symbol=' + alert.pairing}
									>
										<Icon name="linkify" />
									</a>
								</Table.Cell>
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
};

export default connect(mapStateToProps)(AlertsList);
