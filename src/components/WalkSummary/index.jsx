import { useState } from 'react';
import PropTypes from 'prop-types';
import { DateTime } from 'luxon';
import { useSelector } from 'react-redux';
import WalkEditor from '../WalkEditor';
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
	const { id } = useSelector((state) => state.loginSettings);
	const [showWalkEditor, setShowWalkEditor] = useState(false);
	const [walk, setWalk] = useState(props.walk);

	if (props.walk) {
		return (
			<div>
				le {DateTime.fromISO(walk.date).toLocaleString(DateTime.DATE_SHORT)} -{' '}
				{walk.comment} - <WalkFeeling feeling={walk.feeling} />
				{walk.user_id === id && (
					<>
						<WalkEditor
							show={showWalkEditor}
							walk={walk}
							onClose={() => setShowWalkEditor(false)}
							onUpdate={(data) => {
								console.log('WSD', data);
								console.log('WSM', {
									...walk,
									...data,
								});
								setWalk({
									...walk,
									...data,
								});
								setShowWalkEditor(false);
							}}
						/>
						-
						<span
							onClick={() => setShowWalkEditor(true)}
							role='button'
							tabIndex='0'
						>
							Editer
						</span>
					</>
				)}
			</div>
		);
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
