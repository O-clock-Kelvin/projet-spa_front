/** @format */

import React, { useState } from 'react';
import PropTypes from 'prop-types';

// composants
import {
	ToggleButtonGroup,
	// CloseButton,
	ToggleButton,
	Form,
	Modal,
	Button,
} from 'react-bootstrap';

// fonctions
import animalsRequest from '../../requests/animals.request';
import sortUtils from '../../utils/sort.utils';

// styles
import './FilterAnimals.scss';

function FilterDog({
	setFilteredAnimals,
	setFilter,
	setReloadButton,
}) {

	const [species, setSpecies] = useState("DOG");

	// à la soumission du formulaire on récupère toutes les données des states
	const handleOnSubmit = async (e) => {
		e.preventDefault();
		try {
			// requête pour récupérer les animaux de la bonne espèce et envoie des résultats à ListAnimals pour affichage
			const data = await animalsRequest.getAnimalsBySpecies(species);
			const sortedAnimals = sortUtils.sortAnimalsByName(data.data);
			setFilteredAnimals(sortedAnimals);
		} catch (error) {
			console.log(error);
		}
		setFilter(false);
		setReloadButton(true);
	};

	// si on fait Annuler dans le filtre, on ferme le composant FilterDog
	const cancelFilter = () => {
		setFilter(false);	
	};

	return (
		<div className='modal show' style={{ display: 'block', position: 'fixed' }}>
			<Modal.Dialog>
				<Modal.Header>
					<Modal.Title>Filtre</Modal.Title>
				</Modal.Header>

				<Form onSubmit={handleOnSubmit} id='filter-form'>
					<Modal.Body>
						<div className='container-filter'>
							<div className='filter-part'>
								<h3 className='category'>Espèce</h3>
								<ToggleButtonGroup
									type='radio'
									name='species'
									defaultValue={species}
								>
									<ToggleButton
										id='tbg-radio-1'
										value='DOG'
										onChange={(e) => setSpecies(e.target.value)}
									>
										CHIEN
									</ToggleButton>
									<ToggleButton
										id='tbg-radio-2'
										value='CAT'
										onChange={(e) => setSpecies(e.target.value)}
									>
										CHAT
									</ToggleButton>
									<ToggleButton
										id='tbg-radio-3'
										value='OTHER'
										onChange={(e) => setSpecies(e.target.value)}
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
						<Button variant='primary' type='submit'>
							Valider
						</Button>
					</Modal.Footer>
				</Form>
			</Modal.Dialog>
		</div>
	);
}

FilterDog.propTypes = {
	setSpecie: PropTypes.func.isRequired,
	setFilter: PropTypes.func.isRequired,
	setReloadButton: PropTypes.func.isRequired,
	setFilteredAnimals: PropTypes.func.isRequired,
};

export default React.memo(FilterDog);
