import { useState } from 'react';
import { useInfiniteQuery } from 'react-query';
import PropTypes from 'prop-types';
import animalsRequest from '../../requests/animals.request';
import WalkSummary from '../WalkSummary/WalkSummary';
import { Button } from 'react-bootstrap';

import './AnimalWalksList.scss';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';

const LoadNextButton = ({ hasNextPage, isFetchingNextPage, fetchNextPage }) => {
	if (isFetchingNextPage) {
		return (
			<Button role='button' size='sm' disabled>
				Chargement...
			</Button>
		);
	} else {
		if (hasNextPage) {
			return (
				<Button onClick={() => fetchNextPage()} role='button' size='sm'>
					En voir plus
				</Button>
			);
		} else {
			return null;
		}
	}
};
LoadNextButton.propTypes = {
	hasNextPage: PropTypes.bool,
	isFetchingNextPage: PropTypes.bool,
	fetchNextPage: PropTypes.func,
};

const AnimalWalksList = ({ animalId }) => {
	const [walks, setWalks] = useState([]);

	const infinite = useInfiniteQuery(
		'walksList',
		({ pageParam = 0 }) => animalsRequest.getWalks(animalId, pageParam),
		{
			getNextPageParam: (lastPage) => {
				return lastPage.data?.nextCursor || null;
			},
			onSuccess: (data) => {
				setWalks(data);
			},
		}
	);

	const { hasNextPage, isFetchingNextPage, fetchNextPage, isLoading, error } =
		infinite;

	if (!isLoading) {
		if (!error) {
			if (walks.pages && walks.pages[0].data.walks?.length > 0) {
				return (
					<>
						{walks.pages.map((page) =>
							page.data.walks.map((walk) => (
								<WalkSummary key={walk.id} walk={walk} />
							))
						)}
						<LoadNextButton
							hasNextPage={hasNextPage}
							isFetchingNextPage={isFetchingNextPage}
							fetchNextPage={() => fetchNextPage()}
						/>
					</>
				);
			} else {
				return 'Aucune balade';
			}
		} else {
			return 'Une erreur est survenue, veuillez retenter plus tard';
		}
	} else {
		/**
		 * @todo better loading indicator
		 */
		return <LoadingSpinner className='color-primary' />;
	}
};
AnimalWalksList.propTypes = {
	animalId: PropTypes.number,
};

export default AnimalWalksList;
