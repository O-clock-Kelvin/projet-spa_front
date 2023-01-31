import PropTypes from 'prop-types';
import { DateTime } from 'luxon';

import Stack from 'react-bootstrap/Stack';

import './WalkSummary.scss';

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
			<div className='animal-walks'>
				
				<p>le{' '}{DateTime.fromISO(props.walk.date).toLocaleString(DateTime.DATE_SHORT)}{' '}</p>
				<Stack direction='horizontal' gap={2}>
					<p> {props.walk.comment} </p> 
					<span>
						<WalkFeeling feeling={props.walk.feeling} />
					</span>
				</Stack>
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
