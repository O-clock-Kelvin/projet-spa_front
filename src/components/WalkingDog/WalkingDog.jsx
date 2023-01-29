/** @format */

import React, { useState, useEffect } from 'react';

// importation composant
import Card from 'react-bootstrap/Card';
import FilterDog from '../FilterDog/FilterDog';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';

// style
import './styles.scss';
import { BiFemaleSign, BiMaleSign } from 'react-icons/bi';
import { ImEqualizer } from 'react-icons/im';
import { useQuery } from 'react-query';
import { useSelector } from 'react-redux';

// images
import Diego from '../../assets/images/Diego.jpeg';

// fonctions
import { getDogsByExperience, getDogsByFilter} from '../../requests/Dogs';
import { convertBirthdayInAge, convertDateInDaysUntilToday } from '../../utils/convert';


function WalkingDog() {

	const [dogs, setDogs] = useState([]);
    const experience = useSelector((fullstate) => fullstate.loginSettings.experience);

    // on utilise react-query pour voir comment se passe la requête
    // si elle se passe bien elle nous renvoie le résultat sous forme d'objet : data
    // cet objet contient une propriété "data" qui a pour valeur toues les objets correspondant à la requête
	const { isLoading, error, data, isFetching } = useQuery('repoData', () => getDogsByExperience(experience));

	useEffect(() => {
		console.log('loading', isLoading);
		console.log('error', error);
		console.log('data', data);
		console.log('isFetching', isFetching);
		if(data) {
			setDogs(data.data);
		}
	}, [isLoading, error, data, isFetching]);

	const [filter, setFilter] = useState(false);

	const handleOnClick = () => {
		setFilter(true);
	};

	const renderDog = (dog) => {
		const age = convertBirthdayInAge(dog.age);
	
		return (
			<Card
				key={dog.id}
			>
				<Card.Img variant='top' className='card-dog' src={Diego} />
				<Card.Body>
					<Card.Title>{dog.name}</Card.Title>
					<Card.Text>
						<span className='age'>{age} an{age > 1 ? 's' : ''}</span>
						<span>
							{((dog.gender) === 'MALE') ? 
								(<BiMaleSign className='gender' size={30} />):
								(<BiFemaleSign className='gender' size={30} />)
							}	
						</span>
					</Card.Text>
					<Card.Text className='last-walking red'>
						{dog.walks && dog.walks.length > 0 && `Dernière sortie: ${convertDateInDaysUntilToday(dog.walks[0].date)} jours`}
					</Card.Text>
				</Card.Body>
			</Card>
		);
	};

	return (
		<>
			<h1 className='title-page'>Sortir un chien</h1>

			<div>
				<ImEqualizer className='filter' size={30} onClick={handleOnClick} />
			</div>
			{filter && <FilterDog getDogsByFilter={getDogsByFilter} setFilteredDogs={setDogs}/>}
			<div className='cards-container'>
                {/* on attend que data existe: le spinner s'affiche tant qu'on n'a pas data (quand loading)
				quand elle est chargée on map sur data.data */}
                {!isLoading && dogs ? 
					dogs.map((dog) => renderDog(dog)) : 
					<LoadingSpinner />
				}
			</div>
		</>
	);
}

export default React.memo(WalkingDog);
