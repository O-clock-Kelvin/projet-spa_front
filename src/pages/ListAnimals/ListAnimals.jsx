import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import classnames from 'classnames';
import PropTypes from 'prop-types';

// composants bootstrap
import { Button } from 'react-bootstrap';
import { ImEqualizer } from 'react-icons/im';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Form } from 'react-bootstrap';

// composants
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';
import FilterAnimals from '../../components/FilterAnimals/FilterAnimals';

// fonctions
import animalsRequest from '../../requests/animals.request';

// images
import catProfil from '../../assets/images/chat-patte.png';
import sortUtils from '../../utils/sort.utils';
import dogProfil from '../../assets/images/dogProfil.png';

// styles
import "./ListAnimals.scss";

function ListAnimals({
	filter,
	setFilter
}) {
	// tous les animaux récupérés par la requête
	const [allAnimals, setAllAnimals] = useState([]);

	// les animaux à afficher (filtrés)
	const [animals, setAnimals] = useState([]);

	// le bouton revoir la liste
	const [reloadButton, setReloadButton] = useState(false);

	// la recherche par nom
	const [searchName, setSearchName] = useState('');

	// requête pour récupérer tous les animaux à l'affichage de la page
	const { isLoading, error, data, isFetching } = useQuery('repoData', () => animalsRequest.getAllAnimals());

	useEffect(() => {
		if (data) {
			const sortedAnimals = sortUtils.sortAnimalsByName(data.data);
			setAllAnimals(sortedAnimals);
			setAnimals(sortedAnimals);
		}
	}, [isLoading, error, data, isFetching]);

	// au click sur le filtre on affiche le composant
	const openFilter = () => {
		setFilter(true);
		setReloadButton(false);
	};

	// pour revoir la liste de tous les animaux on refait la requête
	const reloadAnimals = async () => {
		try {
			// const data = await animalsRequest.getAllAnimals();
			// const sortedAnimals = sortUtils.sortAnimalsByName(data.data);
			setAnimals(allAnimals);
			setReloadButton(false);
		} catch (error) {
			console.log(error);
		}
	};

	//
	const handleOnSubmit = (e) => {
		e.preventDefault();
		if (!searchName.trim()) return;
		const resultSearch = allAnimals.filter((animal) => animal.name.toLowerCase().includes(searchName.trim().toLowerCase()));
		const sortedResultSearch = sortUtils.sortAnimalsByName(resultSearch);
		setAnimals(sortedResultSearch);
		setReloadButton(true);
		setSearchName('');
	};

	// on affiche chaque carte du chien de la liste récupérée
	const renderAnimal = (animal) => {
		return (
			<Card key={animal.id}  className={classnames('container-card-dog', {'dark-card': filter})}>
				<Link
					to={`/animal/${animal.id}`}
				>
					<Card.Img 
						variant='top' 
						className={classnames('card-dog', animal.url_image? '': 'default-picture')} 
						src={animal.url_image ? animal.url_image : (animal.species === 'CAT') ? catProfil : dogProfil} />
					<Card.Body>
						<Card.Title className='card-title'>{animal.name.toUpperCase()}</Card.Title>
					</Card.Body>
				</Link>
			</Card>
		);
	};

	return (
		<div>
			<h1 className='title-page'>Liste des animaux</h1>

			<div className='main-container'>

				<div className="header-container">

					<div className='search-container'>		
						
							<Form className="d-flex search-form" onSubmit={handleOnSubmit}>
								<Form.Control
									type="search"
									placeholder="Rechercher par le nom"
									className="me-2 search-bar"
									aria-label="Search"
									value={searchName}
									onChange={(e) => setSearchName(e.target.value)}
								/>
								<Button type="submit" className="search-button">Valider</Button>
							</Form>		
						
							<ImEqualizer className='filter' size={30} onClick={openFilter} />
									
					</div>
					
					<div>
						{reloadButton && (
							<Button className='reload-button' type='button' onClick={reloadAnimals}>
								Revoir la liste de tous les animaux
							</Button>
						)}
					</div>

					<div>						
						<FilterAnimals
							show={filter}
							setFilter={setFilter}
							setAnimals={setAnimals}
							setReloadButton={setReloadButton}
						/>
					</div>

				</div>
			
				<div className='cards-container'>
					{!isLoading && animals ? (
						animals.map((animal) => renderAnimal(animal))
					) : (
						<LoadingSpinner />
					)}
				</div>

			</div>
		</div>
	);
}

ListAnimals.propTypes = {
	setFilter: PropTypes.func.isRequired,
	filter: PropTypes.bool.isRequired,
};

export default React.memo(ListAnimals);

