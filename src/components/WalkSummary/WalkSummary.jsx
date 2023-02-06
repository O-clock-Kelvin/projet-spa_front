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
	const inProgress =
		DateTime.fromISO(props.walk.date).plus({ hour: 1 }) >= DateTime.now() &&
		!props.walk.end_date;
	const { admin } = useSelector((state) => state.loginSettings);
	const [showWalkEditor, setShowWalkEditor] = useState(false);

	if (props.walk) {
		return (
			<div className={`animal-walks ${inProgress && 'walk-in-progress'}`}>
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
				{DateTime.fromISO(props.walk.date).plus({ hour: 1 }) >=
					DateTime.now() && !props.walk.end_date ? (
					<div className='d-flex flex-row  '>
						<div className='ms-auto '>
							<span className='tag-mood tag-mood--inprogress'>
								Balade en cours
							</span>
						</div>
					</div>
				) : (
					<div className='d-flex flex-row '>
						<p className='p-1'> {props.walk.comment} </p>
						<div className='ms-auto p-1'>
							<WalkFeeling feeling={props.walk.feeling} />
						</div>
					</div>
				)}
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
		end_date: PropTypes.string,
	}),
};
export default WalkSummary;
