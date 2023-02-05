import PropTypes from 'prop-types';
import { DateTime } from 'luxon';

import './VisitSummary.scss';

const VisitFeeling = ({ feeling }) => {
	switch (feeling) {
		case 'BAD':
			return (
				<span className="tag-mood tag-mood--bad">mauvaise</span>
			);
		case 'MEDIUM':
			return (
				<span className="tag-mood tag-mood--medium">moyenne</span>
			);
		default:
			return (
				<span className="tag-mood tag-mood--good">bonne</span>
			);
	}
};
VisitFeeling.propTypes = {
	feeling: PropTypes.string.isRequired,
};

const VisitSummary = (props) => {
	if (props.visit) {
		return (
			<div className='animal-visits'>
				<p>le{' '}{DateTime.fromISO(props.visit.date).toLocaleString(DateTime.DATE_SHORT)}{' '}</p>
				<div className='d-flex flex-row mb-3'>
					<p>{props.visit.comment}</p>
					<div className='ms-auto p-2'>
						<VisitFeeling feeling={props.visit.feeling} />
					</div>
				</div>
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
