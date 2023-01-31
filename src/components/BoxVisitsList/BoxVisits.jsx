import { useState } from 'react';
import { useInfiniteQuery } from 'react-query';
import PropTypes from 'prop-types';

import VisitSummary from '../VisitSummary/VisitSummary';
import boxesRequest from '../../requests/boxes.request';

const LoadNextButton = ({ hasNextPage, isFetchingNextPage, fetchNextPage }) => {
	if (isFetchingNextPage) {
		return 'Fetching next page...';
	} else {
		if (hasNextPage) {
			return (
				<div onClick={() => fetchNextPage()} role='button' tabIndex={0}>
					Load more
				</div>
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

	const infinite = useInfiniteQuery(
		'boxVisitsList',
		({ pageParam = 0 }) => boxesRequest.getVisits(boxId, pageParam),
		{
			getNextPageParam: (lastPage) => {
				return lastPage.data?.nextCursor || null;
			},
			onSuccess: (data) => {
				console.log('DATA', data.pages);
				setVisits(data);
			},
		}
	);
	const { hasNextPage, isFetchingNextPage, fetchNextPage, isLoading, error } =
		infinite;

	if (!isLoading) {
		if (!error) {
			if (visits.pages && visits.pages?.length > 0) {
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
				return 'Aucune visite du boxe;';
			}
		} else {
			return 'Une erreur est survenue, veuillez retenter plus tard';
		}
	} else {
		return 'Loading...';
	}
};
BoxVisitsList.propTypes = {
	boxId: PropTypes.number,
};

export default BoxVisitsList;
