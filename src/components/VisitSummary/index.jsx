import PropTypes from 'prop-types';
import { DateTime } from 'luxon';

const VisitFeeling = ({ feeling }) => {
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
VisitFeeling.propTypes = {
	feeling: PropTypes.string.isRequired,
};

const VisitSummary = (props) => {
	if (props.visit) {
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
				{DateTime.fromISO(props.visit.date).toLocaleString(DateTime.DATE_SHORT)}{' '}
				- {props.visit.comment} - <VisitFeeling feeling={props.visit.feeling} />
			</div>
		);
	} else {
		return null;
	}
};

VisitSummary.propTypes = {
	visit: PropTypes.shape({
		id: PropTypes.number.isRequired,
		user_id: PropTypes.number.isRequired,
		date: PropTypes.string.isRequired,
		comment: PropTypes.string,
		feeling: PropTypes.string.isRequired,
	}),
};
export default VisitSummary;
