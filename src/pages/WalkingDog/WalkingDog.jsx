/** @format */

import React, { useState, useEffect } from 'react';
import classnames from 'classnames';
import { useQuery } from 'react-query';

// composants
import Card from 'react-bootstrap/Card';
import FilterDog from '../../components/FilterDog/FilterDog';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';
import { Link } from 'react-router-dom';

// bootstrap
import { BiFemaleSign, BiMaleSign } from 'react-icons/bi';
import { ImEqualizer } from 'react-icons/im';
import { Button } from 'react-bootstrap';

// style
import './WalkingDog.scss';

// images
import dogProfil from '../../assets/images/dogProfil.png';

// fonctions
import animalsRequest from '../../requests/animals.request';
import timeUtil from '../../utils/time.utils';
import sortUtils from '../../utils/sort.utils';

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
	const { isLoading, error, data, isFetching } = useQuery('repoData', () => animalsRequest.getDogsByExperience(experience));

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
		setReloadButton(false);
	};

	// pour revoir la liste de tous les chiens on refait la requête
	const reloadDogs = async () => {
		try {
			const dogsReloaded = await animalsRequest.getDogsByExperience(experience);
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
				return 'green';
			case 2:
				return 'orange';
			default:
				return 'red';
		}
	};

	// on affiche chaque carte du chien de la liste récupérée
	const renderDog = (dog) => {
		const age = timeUtil.convertBirthdayInAge(dog.age);
		return (
			<Card key={dog.id}>
				<Link
					to={`/animal/${dog.id}`}
				>
					<Card.Img 
						variant='top' 
						className={classnames('card-dog', dog.url_image? '': 'default-picture')} 
						src={dog.url_image ? dog.url_image : dogProfil}
						/>
					<Card.Body>
						<Card.Title>{dog.name.toUpperCase()}</Card.Title>
						<Card.Text>
							<span className='age'>
								{age} an{age > 1 ? 's' : ''}
							</span>
							<span>
								{dog.gender === 'MALE' ? (
									<BiMaleSign className='gender' size={35} />
									) : (
									<BiFemaleSign className='gender' size={35} />
								)}
							</span>
						</Card.Text>
							{dog.walks && dog.walks.length > 0 && (
								<Card.Text
									className={classnames('last-walking',emergencyWalking(dog.walks[0].date))}
								>
									Dernière sortie : il y a{' '}{timeUtil.convertDateInDaysUntilToday(dog.walks[0].date)}{' '} 
									jour{timeUtil.convertDateInDaysUntilToday(dog.walks[0].date) > 1 ? 's' : ''}
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

			<div className='main-container'>

				<div className='head-container'>
					{reloadButton && (
						<Button className='reload-button-dog' type='button' onClick={reloadDogs}>
							Revoir la liste des chiens
						</Button>
					)}
					<div>
						{filter && (
							<FilterDog
								getDogsByFilter={animalsRequest.getDogsByFilter}
								setFilteredDogs={setDogs}
								setFilter={setFilter}
								setReloadButton={setReloadButton}
							/>
						)}
					</div>
					<div className='filter-container'>
						<ImEqualizer className='filter' size={30} onClick={openFilter} />
					</div>	
				</div>

				<div className='cards-container'>
					{!isLoading && dogs ? (
						dogs.map((dog) => renderDog(dog))
					) : (
						<LoadingSpinner />
					)}
				</div>

			</div>
			
		</>
	);
}

export default React.memo(WalkingDog);
