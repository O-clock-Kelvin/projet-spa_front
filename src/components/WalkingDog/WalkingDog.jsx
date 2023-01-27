/** @format */

import React, { useState, useEffect } from 'react';

// importation composant bootstrap
import Card from 'react-bootstrap/Card';
import FilterDog from '../FilterDog/FilterDog';

// style
import './styles.scss';
import { BiFemaleSign, BiMaleSign } from 'react-icons/bi';
import { ImEqualizer } from 'react-icons/im';
import { useQuery } from 'react-query';
import { useSelector } from 'react-redux';

// images
import Diego from '../../assets/images/Diego.jpeg';

// fonctions
import { getDogsByExperience } from '../../requests/getDogs';


function WalkingDog() {

    const experience = useSelector((fullstate) => fullstate.loginSettings.experience);

    // on utilise react-query pour voir comment se passe la requête
    // si elle se passe bien elle nous renvoie le résultat sous forme d'objet : data
    // cet objet contient une propriété "data" qui a pour valeur toues les objets correspondant à la requête
	const { isLoading, error, data, isFetching } = useQuery('repoData', () => getDogsByExperience(experience));

	useEffect(() => {
		console.log('loading', isLoading);
		console.log('error', error);
		console.log('data', data);
		console.log('isFetching', data);
	}, [isLoading, error, data, isFetching]);

	const [filter, setFilter] = useState(false);

	const handleOnClick = () => {
		setFilter(true);
	};

	return (
		<>
			<h1 className='title-page'>Sortir un chien</h1>

			<div>
				<ImEqualizer className='filter' size={30} onClick={handleOnClick} />
			</div>
			{filter && <FilterDog />}

			<div className='cards-container'>

                {/* on attend que data existe, quand elle est chargée on map sur data.data */}
                {!isLoading  && data ? data.data.map((dog) => (
                    <Card
                        key={dog.id}
                    >
					<Card.Img variant='top' className='card-dog' src={Diego} />
					<Card.Body>
						<Card.Title>{dog.name}</Card.Title>
						<Card.Text>
							<span className='age'>{dog.age}</span>
							<span>
                                {((dog.gender) === 'MALE') ? 
                                    (<BiMaleSign className='gender' size={30} />):
                                    (<BiFemaleSign className='gender' size={30} />)
                                }	
							</span>
						</Card.Text>
						<Card.Text className='last-walking red'>
							Dernière sortie : 2 jours 15 heures
						</Card.Text>
					</Card.Body>
				</Card>
                )):<p>loading</p>}

			</div>
		</>
	);
}

export default React.memo(WalkingDog);
