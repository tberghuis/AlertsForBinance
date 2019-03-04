import React from 'react';
import { connect } from 'react-redux';

const AlertsList = (props) => (
	<React.Fragment>
		<h1>{props.alertType} Alerts</h1>
		<ul>
			{props.alertsList.map((alert) => {
				return (
					<li key={alert.pairing}>
						{alert.price} {alert.pairing}
					</li>
				);
			})}
		</ul>
	</React.Fragment>
);

const mapStateToProps = (state, ownProps) => {
	if (ownProps.alertType === 'BUY') {
		return { alertsList: state.buyAlertsList };
	}
	return { alertsList: state.sellAlertsList };
};

export default connect(mapStateToProps)(AlertsList);
