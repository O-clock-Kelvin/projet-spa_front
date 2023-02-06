import PropTypes from 'prop-types';
import { DateTime } from 'luxon';

// import Stack from 'react-bootstrap/Stack';

import './WalkSummary.scss';
import WalkEditor from '../WalkEditor/WalkEditor';
import { useSelector } from 'react-redux';
import { useState } from 'react';

const WalkFeeling = ({ feeling }) => {
	switch (feeling) {
		case 'BAD':
			return <span className='tag-mood tag-mood--bad'>mauvaise</span>;
		case 'MEDIUM':
			return <span className='tag-mood tag-mood--medium'>moyenne</span>;
		default:
			return <span className='tag-mood tag-mood--good'>bonne</span>;
	}
};
WalkFeeling.propTypes = {
	feeling: PropTypes.string.isRequired,
};

const WalkSummary = (props) => {
	const { admin } = useSelector((state) => state.loginSettings);
	const [showWalkEditor, setShowWalkEditor] = useState(false);
	if (props.walk) {
		return (
			<div className='animal-walks'>
				<p>
					le{' '}
					{DateTime.fromISO(props.walk.date).toLocaleString(
						DateTime.DATE_SHORT
					)}{' '}
					{admin && (
						<>
							<WalkEditor
								walk={props.walk}
								show={showWalkEditor}
								onClose={() => setShowWalkEditor(false)}
								onUpdate={() => setShowWalkEditor(false)}
							/>
							-{' '}
							<span
								role='button'
								tabIndex={0}
								onClick={() => setShowWalkEditor(true)}
							>
								éditer
							</span>
						</>
					)}
				</p>
				<div className='d-flex flex-row mb-3'>
					<p className='p-2'> {props.walk.comment} </p>
					<div className='ms-auto p-2'>
						<WalkFeeling feeling={props.walk.feeling} />
					</div>
				</div>
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
