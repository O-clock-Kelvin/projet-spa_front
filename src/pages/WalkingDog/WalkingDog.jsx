/** @format */

import React, { useState, useEffect } from "react";
import classnames from "classnames";
import { useQuery } from "react-query";

// composants
import Card from "react-bootstrap/Card";
import FilterDog from "../../components/FilterDog/FilterDog";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

// style
import "./WalkingDog.scss";
import { BiFemaleSign, BiMaleSign } from "react-icons/bi";
import { ImEqualizer } from "react-icons/im";

// images
import Diego from "../../assets/images/Diego.jpeg";

// fonctions
import {
	getDogsByExperience,
	getDogsByFilter,
} from "../../requests/dogs.request";
import timeUtil from "../../utils/time.utils";
import sortUtils from "../../utils/sort.utils";

function WalkingDog() {
	// récupération de l'experience du bénévole pour récupérer les bons chiens
	const [dogs, setDogs] = useState([]);
	const [reloadButton, setReloadButton] = useState(false);
	const [filter, setFilter] = useState(false);

	// const experience = useSelector(
	// 	(fullstate) => fullstate.loginSettings.experience
	// );
	const experience = "beginner";

	// on fait la requête qui récupère tous les chiens correspondant à l'experience du bénévole. React-query permet de voir comment comment se passe la requête
	const { isLoading, error, data, isFetching } = useQuery("repoData", () =>
		getDogsByExperience(experience)
	);

	// si la requête se passe bien et qu'on nous retourne data, on trie la liste par ordre de priorité (le tableau se trouve dans data.data)
	useEffect(() => {
		if (data) {
			const sortedDogs = sortUtils.sortDogsByLastWalk(data.data);
			// puis on met à jour lechiens à afficher
			setDogs(sortedDogs);
		}
	}, [isLoading, error, data, isFetching]);

	// au click sur le filtre on affiche le composant
	const openFilter = () => {
		setFilter(true);
	};

	// pour revoir la liste des chiens on refait la même requête
	const reloadDogs = async () => {
		try {
			const dogsReloaded = await getDogsByExperience(experience);
			const sortedDogs = sortUtils.sortDogsByLastWalk(dogsReloaded.data);
			setDogs(sortedDogs);
			setReloadButton(false);
		} catch (error) {
			console.log(error);
		}
	};

	// on change la couleur du texte de la dernière sortie du chien en fonction de la priorité
	const emergencyWalking = (date) => {
		const result = timeUtil.convertDateInDaysUntilToday(date);
		switch (result) {
			case 1:
				return "green";
			case 2:
				return "orange";
			default:
				return "red";
		}
	};

	// on affiche chaque carte du chien de la liste récupérée
	const renderDog = (dog) => {
		const age = timeUtil.convertBirthdayInAge(dog.age);
		return (
			<Card key={dog.id}>
				<Link to={`/animal/${dog.id}`}>
					<Card.Img variant='top' className='card-dog' src={Diego} />
					<Card.Body>
						<Card.Title>{dog.name}</Card.Title>
						<Card.Text>
							<span className='age'>
								{age} an{age > 1 ? "s" : ""}
							</span>
							<span>
								{dog.gender === "MALE" ? (
									<BiMaleSign className='gender' size={30} />
								) : (
									<BiFemaleSign className='gender' size={30} />
								)}
							</span>
						</Card.Text>
						{dog.walks && dog.walks.length > 0 && (
							<Card.Text
								className={classnames(
									"last-walking",
									emergencyWalking(dog.walks[0].date)
								)}
							>
								Dernière sortie : il y a{" "}
								{timeUtil.convertDateInDaysUntilToday(dog.walks[0].date)} jours
							</Card.Text>
						)}
					</Card.Body>
				</Link>
			</Card>
		);
	};

	return (
		<>
			<h1 className='title-page'>Sortir un chien</h1>
			<div>
				<ImEqualizer className='filter' size={30} onClick={openFilter} />
			</div>
			<div>
				{reloadButton && (
					<Button className='reload-button' type='button' onClick={reloadDogs}>
						Revoir la liste
					</Button>
				)}
			</div>
			{filter && (
				<FilterDog
					getDogsByFilter={getDogsByFilter}
					setFilteredDogs={setDogs}
					setFilter={setFilter}
					setReloadButton={setReloadButton}
				/>
			)}
			<div className='cards-container'>
				{!isLoading && dogs ? (
					dogs.map((dog) => renderDog(dog))
				) : (
					<LoadingSpinner />
				)}
			</div>
		</>
	);
}

export default React.memo(WalkingDog);
