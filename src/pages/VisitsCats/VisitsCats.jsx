import React, { useState } from "react";
import { useQuery } from "react-query";
import { DateTime } from "luxon";
import boxesRequest from "../../requests/boxes.request";
import timeUtil from "../../utils/time.utils";
import { Link } from "react-router-dom";

import Card from 'react-bootstrap/Card';

import './VisitsCats.scss';

const renderAnimalsCount = (count, boxSize) => {
	if (count && boxSize) {
		if (count > boxSize) {
			return (
				<div style={{ color: "red" }}>
					Animaux dans le box: {count}/{boxSize}
				</div>
			);
		} else {
			return (
				<div style={{ color: "green" }}>
					Animaux dans le box: {count}/{boxSize}
				</div>
			);
		}
	}
};
const renderLastVisit = (date) => {
	if (date) {
		const startofDay = DateTime.fromISO(date).startOf("day").toISO();
		const difference = timeUtil.convertDateInDaysUntilToday(startofDay);
		console.log("DIFFERNEC", difference);
		switch (difference) {
			case 0:
				return "Dernière visite: aujourd'hui";
			case 1:
				return "Dernière visite: hier";
			default:
				return `Dernière visite: il y a ${difference} jours`;
		}
	} else {
		return "Jamais visité !";
	}
};
const VisitsCats = () => {
	const [boxes, setBoxes] = useState();

	const { isLoading, error } = useQuery({
		queryFn: () => {
			return boxesRequest.getAll({ includeVisits: true, includeAnimals: true });
		},
		onSuccess: (data) => {
			const boxes = data.data;

			/**
			 * On récupère uniquement les box de type "CAT"
			 */
			const catBoxes = boxes.filter((box) => box.type === "CAT");

			/**
			 * On récupère les boxes jamais visitées
			 */
			const boxesNeverVisited = catBoxes.filter(
				(box) => box.visits?.length === 0
			);

			/**
			 * On récupère UNIQUEMENT les box qui n'ont pas été visitées dans la journées
			 */
			const boxesNotVisitedToday = catBoxes.filter(
				(box) =>
					box.visits?.length > 0 &&
					DateTime.fromISO(box.visits[box.visits.length - 1].date) <=
						DateTime.now().startOf("day")
			);

			/**
			 * On les filtre dans un ordre croissant au niveau de la date de la dernière visite
			 */
			const boxesOrderedByDateDesc = boxesNotVisitedToday.sort((b1, b2) => {
				const b1Date = DateTime.fromISO(b1.visits[b1.visits.length - 1].date);
				const b2Date = DateTime.fromISO(b2.visits[b2.visits.length - 1].date);

				if (b1Date > b2Date) {
					return 1;
				} else if (b1Date < b2Date) {
					return -1;
				} else {
					return 0;
				}
			});

			/**
			 * On crée un tableau qui reprends les deux filtres
			 */
			setBoxes([...boxesNeverVisited, ...boxesOrderedByDateDesc]);
		},
	});

	if (!isLoading) {
		if (!error) {
			if (boxes && boxes.length > 0) {
				return (
					<>
					
						<h3 className='title-page'>Liste des boxs a visiter</h3>
						<div className='visits main-container d-flex flex-wrap justify-content-center'>
							{boxes.map((box) => {
								return (
									<Link
										to={`/box/${box.id}`}
										key={box.id}
										className='link-no-decoration'
									>
										<Card className='align-items-center justify-content-between m-3 p-3' style={{width:'18rem', minHeight:'200px'}}>
											<div className='d-flex align-items-center justify-content-center' style={{width:100, height:'100px'}}>
												<p>{box.number}</p>
											</div>
											{renderLastVisit(box.visits[box.visits.length - 1]?.date)}
											{renderAnimalsCount(
												box.animals?.length,
												box.nbr_of_places
											)}
										</Card>
									</Link>
								);
							})}
						</div>
					</>
				);
			} else {
				/**
				 * @todo better message
				 */
				return "Aucune box a visiter aujourd'hui";
			}
		} else {
			//@todo better error handling
			return "Une erreur est survenue, merci de retenter plus tard.";
		}
	} else {
		// @todo better loading indicateor
		return "Loading...";
	}
};

export default React.memo(VisitsCats);
