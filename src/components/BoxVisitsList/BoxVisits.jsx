import { useState } from 'react';
import { useInfiniteQuery } from 'react-query';
import PropTypes from 'prop-types';

import VisitSummary from '../VisitSummary/VisitSummary';
import boxesRequest from '../../requests/boxes.request';

import { Button } from 'react-bootstrap';
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
		}
	}
};
LoadNextButton.propTypes = {
	hasNextPage: PropTypes.bool,
	isFetchingNextPage: PropTypes.bool,
	fetchNextPage: PropTypes.func,
};

const BoxVisitsList = ({ boxId }) => {
	const [visits, setVisits] = useState([]);

	const { hasNextPage, isFetchingNextPage, fetchNextPage, isLoading, error } =
		useInfiniteQuery(
			'boxVisitsList',
			({ pageParam = 0 }) => boxesRequest.getVisits(boxId, pageParam),
			{
				getNextPageParam: (lastPage) => {
					return lastPage.data?.nextCursor || null;
				},
				onSuccess: (data) => {
					setVisits(data);
				},
			}
		);

	if (!isLoading) {
		if (!error) {
			if (visits.pages && visits.pages[0].data.visits?.length > 0) {
				return (
					<>
						{visits.pages.map((page) =>
							page.data.visits.map((visit) => (
								<VisitSummary key={visit.id} visit={visit} />
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
				return 'Aucune visite du boxe';
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
BoxVisitsList.propTypes = {
	boxId: PropTypes.number,
};

export default BoxVisitsList;
