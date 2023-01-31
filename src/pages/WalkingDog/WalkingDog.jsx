/** @format */

import React, { useState, useEffect } from 'react';
import classnames from 'classnames';

// importation composant
import Card from 'react-bootstrap/Card';
import FilterDog from '../../components/FilterDog/FilterDog';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';

// style
import './styles.scss';
import { BiFemaleSign, BiMaleSign } from 'react-icons/bi';
import { ImEqualizer } from 'react-icons/im';
import { useQuery } from 'react-query';
// import { useSelector } from 'react-redux';

// images
import Diego from '../../assets/images/Diego.jpeg';

// fonctions
import { getDogsByExperience, getDogsByFilter } from '../../requests/Dogs';
import timeUtil from '../../utils/time.utils';

import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import sortUtils from '../../utils/sort.utils';

function WalkingDog() {
	const [dogs, setDogs] = useState([]);
	const [reloadButton, setReloadButton] = useState(false);

	// const experience = useSelector(
	// 	(fullstate) => fullstate.loginSettings.experience
	// );
	const experience = "beginner";

	// on utilise react-query pour voir comment se passe la requête
	// si elle se passe bien elle nous renvoie le résultat sous forme d'objet : data
	// cet objet contient une propriété "data" qui a pour valeur toues les objets correspondant à la requête
	const { isLoading, error, data, isFetching } = useQuery('repoData', () =>
		getDogsByExperience(experience)
	);

	useEffect(() => {
		console.log('loading', isLoading);
		console.log('error', error);
		console.log('data', data);
		console.log('isFetching', isFetching);
		if (data) {
			const sortedDogs = sortUtils.sortDogsByLastWalk(data.data);
			setDogs(sortedDogs);
		}
	}, [isLoading, error, data, isFetching]);

	const [filter, setFilter] = useState(false);

	const openFilter = () => {
		setFilter(true);
	};

	const reloadDogs = async () => {
		const dogsReloaded = await getDogsByExperience(experience);
		console.log(dogsReloaded);
		const sortedDogs = sortUtils.sortDogsByLastWalk(dogsReloaded.data);
		setDogs(sortedDogs);
		setReloadButton(false);
	};

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

	const renderDog = (dog) => {
		const age = timeUtil.convertBirthdayInAge(dog.age);

		return (
			<Card key={dog.id}>
				<Link
					to={`/animal/${dog.id}`}
				>
					<Card.Img variant='top' className='card-dog' src={Diego} />
					<Card.Body>
						<Card.Title>{dog.name}</Card.Title>
						<Card.Text>
							<span className='age'>
								{age} an{age > 1 ? 's' : ''}
							</span>
							<span>
								{dog.gender === 'MALE' ? (
									<BiMaleSign className='gender' size={30} />
									) : (
									<BiFemaleSign className='gender' size={30} />
								)}
							</span>
						</Card.Text>
						{dog.walks && dog.walks.length > 0 && (
							<Card.Text
							className={classnames(
								'last-walking',
									emergencyWalking(dog.walks[0].date)
								)}
								>
								Dernière sortie : il y a{' '}
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
				{/* on attend que data existe: le spinner s'affiche tant qu'on n'a pas data (quand loading)
				quand elle est chargée on map sur data.data */}
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
