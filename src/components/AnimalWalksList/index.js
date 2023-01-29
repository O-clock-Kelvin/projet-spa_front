import { useState } from 'react';
import { useQuery } from 'react-query';
import PropTypes from 'prop-types';
import animalsRequest from '../../requests/animals.request';
import WalkSummary from '../WalkSummary';

const AnimalWalksList = ({ animalId }) => {
	const [walks, setWalks] = useState([]);
	// use query
	const { error, isLoading } = useQuery('getAnimalWalks', {
		queryFn: async () => animalsRequest.getWalks(animalId),

		onSuccess: (data) => {
			console.log(data);
			setWalks(data.data);
		},
	});

	if (!isLoading) {
		if (!error) {
			return walks.length > 0 ? (
				<ul>
					{walks.map((walk) => (
						<WalkSummary key={walk.id} walk={walk} />
					))}
				</ul>
			) : (
				<p>Aucune balade enregistrée</p>
			);
		} else {
			return 'Une erreur est survenue, veuillez retenter plus tard';
		}
	} else {
		return 'Loading...';
	}
};
AnimalWalksList.propTypes = {
	animalId: PropTypes.number,
};
export default AnimalWalksList;
