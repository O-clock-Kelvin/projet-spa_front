import React, { useState } from 'react';
import { useQuery } from 'react-query';
import classnames from 'classnames';
import PropTypes from 'prop-types';

// composants bootstrap
import { Button } from 'react-bootstrap';
import { ImEqualizer } from 'react-icons/im';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Form } from 'react-bootstrap';
import { BiFemaleSign, BiMaleSign } from "react-icons/bi";

// composants
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';
import FilterAnimals from '../../components/FilterAnimals/FilterAnimals';

// fonctions
import animalsRequest from '../../requests/animals.request';
import errorUtils from '../../utils/error.utils';

import timeUtil from "../../utils/time.utils";

import sortUtils from '../../utils/sort.utils';


// images
import catProfil from '../../assets/images/chat-patte.png';
import dogProfil from '../../assets/images/dogProfil.png';

// styles
import "./ListAnimals.scss";
import { Row } from 'react-bootstrap';
import { Col } from 'react-bootstrap';

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
	const { error, isLoading } = useQuery('repoData', {
		queryFn: async () =>
			animalsRequest.getAllAnimals({
				includeTags: true,
				includeWalks: true,
			}),

		onSuccess: (data) => {
			const sortedAnimals = sortUtils.sortAnimalsByName(data.data);
			setAllAnimals(sortedAnimals);
			setAnimals(sortedAnimals);
		},
	});

	// au click sur le filtre on affiche le composant
	const openFilter = () => {
		setFilter(true);
		setReloadButton(false);
	};

	// pour revoir la liste de tous les animaux on refait la requête
	const reloadAnimals = () => {
		setAnimals(allAnimals);
		setReloadButton(false);
	};

	// à la soumission du formulaire on vérifie si la chaines de caractères entrée correspond à un nom d'animal
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
		const age = timeUtil.convertBirthdayInAge(animal.age);
		return (
			<Card key={animal.id}  className={classnames('container-card-animal', {'dark-card': filter})}>
				<Link
					to={`/animal/${animal.id}`}
				>
				<div className='dog-container animal-container'>
					<Card.Img 
						variant='top' 
						className={classnames('card-dog', animal.url_image? '': 'default-picture')} 
						src={animal.url_image ? animal.url_image : (animal.species === 'CAT') ? catProfil : dogProfil} />
					<Card.Body>
						<Card.Title className='card-title'>{animal.name.toUpperCase()}</Card.Title>
						<Card.Text>
								<span className='age'>
									{age} an{age > 1 ? "s" : ""}
								</span>
								<span>
									{animal.gender === "MALE" ? (
										<BiMaleSign className='gender' size={35} />
									) : (
										<BiFemaleSign className='gender' size={35} />
									)}
								</span>
							</Card.Text>	
					</Card.Body>
					</div>
				</Link>
			</Card>
		);
	};

	return (
		<div>
			<h1 className='title-page'>Liste des animaux</h1>

			<div className='main-container'>

				<Row className="header-container">

					<Col xs={10}>		
						
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
							</Col>
							
									
					
					


					<Col xs={2} className="filter-animals-list" >	
					<ImEqualizer className='filter' size={30} onClick={openFilter} />					
						<FilterAnimals
							show={filter}
							setFilter={setFilter}
							setAnimals={setAnimals}
							setReloadButton={setReloadButton}
						/>
					</Col>

					<div>
						{reloadButton && (
							<Button className='reload-button' type='button' onClick={reloadAnimals}>
								Revoir la liste des animaux
							</Button>
						)}
					</div>

				</Row>
			
				<div className='cards-container'>
					{isLoading ? <LoadingSpinner /> :
						error ? (errorUtils.errorHandler(error)) :
						animals.length === 0 ? (<p>Il n'y a pas d'animaux correspondants à votre recherche.</p>) :
						(animals.map((animal) => renderAnimal(animal)))
					}			
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

