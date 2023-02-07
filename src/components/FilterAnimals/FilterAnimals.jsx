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

	// à la soumission du formulaire on récupère toutes les données des states
	const handleOnSubmit = async (e) => {
		e.preventDefault();
		try {
			// requête pour récupérer les animaux de la bonne espèce et envoie des résultats à ListAnimals pour affichage
			const data = await animalsRequest.getAnimalsBySpecies(species);
			const sortedAnimals = sortUtils.sortAnimalsByName(data.data);
			setAnimals(sortedAnimals);
		} catch (error) {
			console.log(error);
		}
		setFilter(false);
		setReloadButton(true);
	};

	// si on ferme le filtre
	const closeFilter = () => {
		setFilter(false);
		setReloadButton(true);
	};

	// réinitialisation du filtre
	const resetFilter = () => {
		setSpecies();
	};

	const updateSpecies = (speciesValue) => {
		if (species != undefined) {
			setSpecies(undefined);
		} else {
			setSpecies(speciesValue);
		}
	};

	return (
	
			<Modal show={show}>
				<Modal.Header 
					closeButton
					onClick={closeFilter}
				>
					<Modal.Title>Filtre</Modal.Title>
				</Modal.Header>

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
						<Button 
							className="reset-button"
							variant='secondary'
							onClick={resetFilter}
						>
							Réinitialiser le filtre
						</Button>
						<Button variant='primary' type='submit' onClick={handleOnSubmit}>
							Rechercher
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
