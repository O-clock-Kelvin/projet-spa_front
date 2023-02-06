/** @format */

import React, { useState } from "react";
// import { useSelector } from "react-redux";
import classnames from "classnames";
import PropTypes from "prop-types";
import { useQuery } from "react-query";
import {DateTime} from 'luxon';

// composants
import Card from "react-bootstrap/Card";
import FilterDog from "../../components/FilterDog/FilterDog";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import { Link } from "react-router-dom";

// bootstrap
import { BiFemaleSign, BiMaleSign } from "react-icons/bi";
import { ImEqualizer } from "react-icons/im";
import { Button } from "react-bootstrap";

// style
import "./WalkingDog.scss";

// images
import dogProfil from "../../assets/images/dogProfil.png";

// fonctions
import animalsRequest from "../../requests/animals.request";
import timeUtil from "../../utils/time.utils";
import errorUtils from "../../utils/error.utils";
// import sortUtils from "../../utils/sort.utils";

function WalkingDog({ filter, setFilter }) {

	// récupération de l'experience du bénévole pour récupérer les bons chiens
	// const experience = useSelector((fullstate) => fullstate.loginSettings.experience);
	const experience = 'MEDIUM';
	
	// tous les chiens correspondant à l'expérience du bénévole
	const [allDogs, setAllDogs] = useState([]);

	// chiens à afficher
	const [dogs, setDogs] = useState([]);

	// le bouton revoir la liste
	const [reloadButton, setReloadButton] = useState(false);

	// on fait la requête qui récupère tous les chiens correspondant à l'experience du bénévole. React-query permet de voir comment comment se passe la requête
	// const { isLoading, error, data, isFetching } = useQuery("repoData", () => animalsRequest.getDogsByExperience(experience));


	const { error, isLoading } = useQuery('repoData', {
		queryFn: async () =>
			animalsRequest.getDogsByExperience(experience, {
				includeTags: true,
				includeWalks: true,
			}),

		onSuccess: (data) => {
			const dogsNeverWalked = data.data.filter((dog) => dog.walks?.length === 0);

			const dogsNotWalkedToday = data.data.filter(
				(dog) =>
					dog.walks?.length > 0 &&
					DateTime.fromISO(dog.walks[dog.walks.length-1].date) <=
						DateTime.now().startOf("day")
			);

			const dogsOrderedByDateDesc = dogsNotWalkedToday.sort((d1, d2) => {
				const d1Date = DateTime.fromISO(d1.walks[d1.walks.length-1].date);
				const d2Date = DateTime.fromISO(d2.walks[d2.walks.length-1].date);
				if (d1Date > d2Date) {
					return 1;
				} else if (d1Date < d2Date) {
					return -1;
				} else {
					return 0;
				}
			});
			
			// puis on met à jour les chiens à afficher
			setAllDogs([...dogsNeverWalked, ...dogsOrderedByDateDesc]);
			setDogs([...dogsNeverWalked, ...dogsOrderedByDateDesc]);
		},
	});

	// au click sur le filtre on affiche le composant
	const openFilter = () => {
		setFilter(true);
		setReloadButton(false);
	};

	// pour revoir la liste de tous les chiens on refait la requête
	const reloadDogs = async () => {
		setDogs(allDogs);
		setReloadButton(false);	
	};

	const renderLastWalk = (date) => {
		if(date){
			const startofDay = DateTime.fromISO(date).startOf("day").toISO();
			const difference = timeUtil.convertDateInDaysUntilToday(startofDay);
			switch (difference) {
				case 0:
					return (<span className="green">Dernière sortie : aujourd'hui</span>);
				case 1:
					return (<span className="green">Dernière sortie : hier</span>);
				case 2:
					return (<span className="orange">Dernière sortie : il y a 2 jours</span>);
				default:
					return (<span className="red">Dernière sortie : il y a {difference} jours</span>);		
			}
		} 
		else{
			return (<span className="red">Jamais sorti</span>);
		}
	};

	// on affiche chaque carte du chien de la liste récupérée
	const renderDog = (dog) => {
		const age = timeUtil.convertBirthdayInAge(dog.age);
		return (
			<Card key={dog.id}>
				<Link to={`/animal/${dog.id}`}>
					<Card.Img
						variant='top'
						className={classnames(
							"card-dog",
							dog.url_image ? "" : "default-picture"
						)}
						src={dog.url_image ? dog.url_image : dogProfil}
					/>

					<Card.Body>
						<Card.Title>{dog.name.toUpperCase()}</Card.Title>
						<Card.Text>
							<span className='age'>
								{age} an{age > 1 ? "s" : ""}
							</span>
							<span>
								{dog.gender === "MALE" ? (
									<BiMaleSign className='gender' size={35} />
								) : (
									<BiFemaleSign className='gender' size={35} />
								)}
							</span>
						</Card.Text>		
							<Card.Text
								className={classnames(
									"last-walking"
								)}
							>
								{renderLastWalk(dog.walks[dog.walks?.length-1]?.date)}
							</Card.Text>				
					</Card.Body>
				</Link>
			</Card>
		);
	};

	return (
		<>
			<h1 className='title-page'>Sortir un chien</h1>

			<div className='main-container'>
				<div className='head-container'>
					{reloadButton && (
						<Button
							className='reload-button-dog'
							type='button'
							onClick={reloadDogs}
						>
							Revoir la liste des chiens
						</Button>
					)}
					<div>
						<FilterDog
							show={filter}
							setDogs={setDogs}
							setFilter={setFilter}
							setReloadButton={setReloadButton}
							experience={experience}
						/>
					</div>
					<div className='filter-container'>
						<ImEqualizer className='filter' size={30} onClick={openFilter} />
					</div>
				</div>

				<div className='cards-container'>
					{/* {error && errorUtils.errorHandler(error)}
					{!isLoading && dogs? 
						(dogs.map((dog) => renderDog(dog))) : (
						<LoadingSpinner />
					)} */}
					{isLoading ? <LoadingSpinner /> :
						error ? (errorUtils.errorHandler(error)) :
						(dogs.map((dog) => renderDog(dog)))
					}
				</div>
			</div>
		</>
	);
}

WalkingDog.propTypes = {
	setFilter: PropTypes.func.isRequired,
	filter: PropTypes.bool.isRequired,
};

export default React.memo(WalkingDog);
