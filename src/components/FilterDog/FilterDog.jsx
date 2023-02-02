/** @format */

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

// composants
import {
	ToggleButtonGroup,
	CloseButton,
	ToggleButton,
	Form,
	Modal,
	Button,
	Badge,
} from 'react-bootstrap';

// fonctions
import timeUtil from '../../utils/time.utils';
import sortUtils from '../../utils/sort.utils';

// data
import dataTags from '../../data/tags';

// styles
import './FilterDog.scss';
function FilterDog({
	getDogsByFilter,
	setFilteredDogs,
	setFilter,
	setReloadButton,
	show
}) {

	// récupération de l'experience du bénévole pour récupérer les bons chiens
	const experience = useSelector((fullstate) => fullstate.loginSettings.experience);

	// déclaration des variables du state
	const [gabaritValue, setGabaritValue] = useState('big');
	const [sexValue, setSexValue] = useState('male');
	const [valueAge, setvalueAge] = useState(0);

	const [firstSubmit, setFirstSubmit] = useState(false);

	// tableau des tags envoyé pour la requête
	const [tags, setTags] = useState([]);
	// liste des tags du select
	const [tagsList, setTagsList] = useState(dataTags);

	// on met à jour les tags en fonction de la sélection
	const handleOnAddTag = (e) => {
		setTagsList((oldState) =>
			oldState.filter((tag) => tag.id !== Number(e.target.value))
		);
		setTags((oldState) => [...oldState, e.target.value]);
	};

	// si on enlève un tag de la sélection, il revient dans la liste
	const cancelTag = (tagToCancel) => {
		setTags((oldState) => oldState.filter((tag) => tag !== tagToCancel));
		const oldTag = dataTags.filter((tag) => tag.id == tagToCancel);
		setTagsList((oldState) => [...oldState, oldTag[0]]);
	};

	// à la soumission du formulaire on récupère toutes les données des states
	const handleOnSubmit = async (e) => {
		e.preventDefault();

		// conversion de l'age en un intervalle de dates (3ans => né entre le 01/01/2020 et le 31/12/2020)
		const { startYearBirthday, endYearBirthday } = timeUtil.convertAgeInIntervalDate(valueAge);

		// requête pour récupérer la nouvelle liste des chiens avec les filtres
		const data = await getDogsByFilter(
			experience,
			gabaritValue,
			sexValue,
			startYearBirthday,
			endYearBirthday,
			tags
		);

		// on trie les chiens récupérés de la requête par ordre de priorité, et on les renvoie au composant WalkingDog pour affichage
		const sortedDogs = sortUtils.sortDogsByLastWalk(data.data);
		setFilteredDogs(sortedDogs);
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

	const renderTag = (tag) => {
		// on récupère l'id du tag pour afficher le composant tag
		const tagId = Number(tag);
		const tagFound = dataTags.find((tag) => tag.id === tagId);

		return (
			<div className='container-badge'>
				<Badge key={tagId}>{tagFound.name}</Badge>
				<CloseButton onClick={() => cancelTag(tag)} />
			</div>
		);
	};

	return (
		
			<Modal show={show} onHide={cancelFilter}>
				<Modal.Header>
					<Modal.Title>Filtres</Modal.Title>
				</Modal.Header>

				<Form onSubmit={handleOnSubmit} id='filter-form'>
					<Modal.Body>
						<div className='container-filter'>
							<div className='filter-part'>
								<h3 className='category'>Gabarit</h3>
								<ToggleButtonGroup
									type='radio'
									name='size'
									defaultValue={gabaritValue}
								>
									<ToggleButton
										id='tbg-radio-1'
										value='big'
										onChange={(e) => setGabaritValue(e.target.value)}
									>
										GROS
									</ToggleButton>
									<ToggleButton
										id='tbg-radio-2'
										value='medium'
										onChange={(e) => setGabaritValue(e.target.value)}
									>
										MOYEN
									</ToggleButton>
									<ToggleButton
										id='tbg-radio-3'
										value='small'
										onChange={(e) => setGabaritValue(e.target.value)}
									>
										PETIT
									</ToggleButton>
								</ToggleButtonGroup>
							</div>

							<div className='filter-part'>
								<h3 className='category'>Sexe</h3>
								<ToggleButtonGroup
									type='radio'
									name='gender'
									defaultValue={sexValue}
								>
									<ToggleButton
										id='tbg-radio-4'
										value='male'
										onChange={(e) => setSexValue(e.target.value)}
									>
										MALE
									</ToggleButton>
									<ToggleButton
										id='tbg-radio-5'
										value='female'
										onChange={(e) => setSexValue(e.target.value)}
									>
										FEMELLE
									</ToggleButton>
								</ToggleButtonGroup>
							</div>

							<div className='filter-part'>
								<h3 className='category'>Age</h3>
								<Form.Range
									min='0'
									max='15'
									step='1'
									value={valueAge}
									onChange={(e) => setvalueAge(e.target.value)}
								/>
								<p>{valueAge} ans</p>
							</div>

							<div className='filter-part'>
								<h3 className='category'>Tempéramment</h3>
								<Form.Select
									aria-label='Default select example'
									onChange={handleOnAddTag}
								>
									<option>Sélectionner</option>
									{tagsList.map((tag) => (
										<option key={tag.id} value={`${tag.id}`}>
											{tag.name}
										</option>
									))}
								</Form.Select>

								<div className='tags-container'>
									{tags && tags.map((tag) => renderTag(tag))}
								</div>
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
			</Modal>
		
	);
}

FilterDog.propTypes = {
	getDogsByFilter: PropTypes.func.isRequired,
	setFilteredDogs: PropTypes.func.isRequired,
	setFilter: PropTypes.func.isRequired,
	setReloadButton: PropTypes.func.isRequired,
	show: PropTypes.bool.isRequired,
};

export default React.memo(FilterDog);
