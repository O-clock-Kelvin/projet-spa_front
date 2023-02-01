import React, { useState } from "react";
import { useQuery } from "react-query";
import { DateTime } from "luxon";
import boxesRequest from "../../requests/boxes.request";
import timeUtil from "../../utils/time.utils";
import { Link } from "react-router-dom";

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
						<h3>Liste des boxs a visiter</h3>
						<div
							style={{
								display: "grid",
								gridTemplateColumns: "repeat(4,1fr)",
								gridGap: "0.625rem",
							}}
						>
							{boxes.map((box) => {
								return (
									<Link to={`/box/${box.id}`} key={box.id}>
										<div
											style={{
												backgroundColor: "lightgray",
												padding: "0.313rem",
												justifyContent: "center",
												alignItems: "center",
												borderRadius: "0.25rem",
												minHeight: "100%",
											}}
										>
											<div
												style={{
													display: "flex",
													backgroundColor: "white",
													borderRadius: "0.25rem",
													minHeight: "5rem",
													justifyContent: "center",
													alignItems: "center",
													fontWeight: "bold",
												}}
											>
												{box.number}
											</div>
											{renderLastVisit(box.visits[box.visits.length - 1]?.date)}
											{renderAnimalsCount(
												box.animals?.length,
												box.nbr_of_places
											)}
										</div>
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
