import PropTypes from 'prop-types';
import { DateTime } from 'luxon';

const WalkFeeling = ({ feeling }) => {
	switch (feeling) {
		case 'BAD':
			return (
				<span style={{ borderColor: 'red', borderWidth: '1px' }}>mauvaise</span>
			);
		case 'MEDIUM':
			return (
				<span style={{ borderColor: 'orange', borderWidth: '1px' }}>
					moyenne
				</span>
			);
		default:
			return (
				<span style={{ borderColor: 'green', borderWidth: '1px' }}>bonne</span>
			);
	}
};
WalkFeeling.propTypes = {
	feeling: PropTypes.string.isRequired,
};

const WalkSummary = (props) => {
	if (props.walk) {
		return (
			<div
				style={{
					backgroundColor: 'lightgray',
					marginTop: '5px',
					marginBottom: '5px',
					width: '25vw',
				}}
			>
				le{' '}
				{DateTime.fromISO(props.walk.date).toLocaleString(DateTime.DATE_SHORT)}{' '}
				- {props.walk.comment} - <WalkFeeling feeling={props.walk.feeling} />
			</div>
		);
	} else {
		return null;
	}
};

WalkSummary.propTypes = {
	walk: PropTypes.shape({
		id: PropTypes.number.isRequired,
		user_id: PropTypes.number.isRequired,
		date: PropTypes.string.isRequired,
		comment: PropTypes.string,
		feeling: PropTypes.string.isRequired,
	}),
};
export default WalkSummary;
