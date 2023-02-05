/** @format */

import React, { useState } from 'react';
import PropTypes from 'prop-types';

// composants
import {
	ToggleButtonGroup,
	ToggleButton,
	Modal,
	Button,
} from 'react-bootstrap';

// fonctions
import animalsRequest from '../../requests/animals.request';
import sortUtils from '../../utils/sort.utils';

// styles
import './FilterAnimals.scss';

function FilterDog({
	setAnimals,
	setFilter,
	setReloadButton,
	show
}) {

	const [species, setSpecies] = useState();
	const [firstSubmit, setFirstSubmit] = useState(false);

	// à la soumission du formulaire on récupère toutes les données des states
	const handleOnSubmit = async (e) => {
		console.log('HANDLE', species);
		e.preventDefault();
		try {
			// requête pour récupérer les animaux de la bonne espèce et envoie des résultats à ListAnimals pour affichage
			const data = await animalsRequest.getAnimalsBySpecies(species);
			console.log(data.data);
			const sortedAnimals = sortUtils.sortAnimalsByName(data.data);
			setAnimals(sortedAnimals);
		} catch (error) {
			console.log(error);
		}
		setFilter(false);
		setReloadButton(true);
		setFirstSubmit(true);
	};

	// si on fait Annuler dans le filtre, on ferme le composant FilterDog
	const cancelFilter = () => {
		setFilter(false);
		if (firstSubmit) {
			setReloadButton(true);
		}
	};

	const updateSpecies = (speciesValue) => {
		console.log('UPDATE', speciesValue);
		if (species != undefined) {
			setSpecies(undefined);
			console.log('undefined');
		} else {
			setSpecies(speciesValue);
			console.log(speciesValue);
		}
	};

	return (
	
			<Modal show={show}>
				<Modal.Header>
					<Modal.Title>Filtre</Modal.Title>
				</Modal.Header>

				{/* <Form onSubmit={handleOnSubmit} id='filter-form'> */}
					<Modal.Body>
						<div className='container-filter'>
							<div className='filter-part'>
								<h3 className='category'>Espèce</h3>
								<ToggleButtonGroup
									type='checkbox'
									name='species'
									defaultValue={species}
								>
									<ToggleButton
										id='tbg-radio-1'
										value='DOG'
										type='checkbox'
										disabled={species != "DOG" && species != undefined}
										onChange={(e) => updateSpecies(e.target.value)}
									>
										CHIEN
									</ToggleButton>
									<ToggleButton
										id='tbg-radio-2'
										value='CAT'
										type='checkbox'
										disabled={species != "CAT" && species != undefined}
										onChange={(e) => updateSpecies(e.target.value)}
									>
										CHAT
									</ToggleButton>
									<ToggleButton
										id='tbg-radio-3'
										value='OTHER'
										type='checkbox'
										disabled={species != "OTHER" && species != undefined}
										onChange={(e) => updateSpecies(e.target.value)}
									>
										AUTRE
									</ToggleButton>
								</ToggleButtonGroup>
							</div>

						</div>
					</Modal.Body>

					<Modal.Footer>
						<Button variant='secondary' onClick={cancelFilter}>
							Annuler
						</Button>
						<Button variant='primary' type='submit' onClick={handleOnSubmit}>
							Valider
						</Button>
					</Modal.Footer>
				
			</Modal>
		
	);
}

FilterDog.propTypes = {
	setFilter: PropTypes.func.isRequired,
	setReloadButton: PropTypes.func.isRequired,
	setAnimals: PropTypes.func.isRequired,
	show: PropTypes.bool
};

export default React.memo(FilterDog);
