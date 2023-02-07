/** @format */

import React, { useState } from "react";
import PropTypes from "prop-types";
import {DateTime} from 'luxon';

// composants
import DoubleThumbsRange from "../DoubleThumbsRange/DoubleThumbsRange";
//bootstrap
import {
	ToggleButtonGroup,
	CloseButton,
	ToggleButton,
	Form,
	Modal,
	Button,
	Badge,
} from "react-bootstrap";

// fonctions
import timeUtil from "../../utils/time.utils";
import animalsRequest from "../../requests/animals.request";

// data
import dataTags from "../../data/tags";

// styles
import "./FilterDog.scss";
function FilterDog({
	setDogs,
	setFilter,
	setReloadButton,
	show,
	experience
}) {

	// déclaration des variables du state
	const [gabaritValue, setGabaritValue] = useState();
	const [sexValue, setSexValue] = useState();
	const [ages, setAges] = useState([
        0, 20,
    ]);
	// tableau des tags envoyé pour la requête
	const [tags, setTags] = useState([]);
	// liste des tags du select
	const [tagsList, setTagsList] = useState(dataTags);

	// on enlève les tags de la liste déroulante en fonction de la sélection
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
		let { startYearBirthday: lowerYearStart } = timeUtil.convertAgeInIntervalDate(ages[0]);
		let { endYearBirthday: upperYearStart } = timeUtil.convertAgeInIntervalDate(ages[1]+1);

		// requête pour récupérer la nouvelle liste des chiens avec les filtres
		try {
			const data = await animalsRequest.getDogsByFilter({
				experience,
				gabaritValue,
				sexValue,
				startYearBirthday: ages[0]!=0 ? lowerYearStart: DateTime.now().toISO(),
				endYearBirthday: upperYearStart,
				tags
			});

			// on trie les chiens récupérés de la requête par ordre de priorité, et on les renvoie au composant WalkingDog pour affichage
			if (data) {
				console.log(data.data);
				const dogsNeverWalked = data.data.filter((dog) => dog.walks?.length === 0);
	
				const dogsNotWalkedToday = data.data.filter(
					(dog) =>
						dog.walks?.length > 0 &&
						(DateTime.fromISO(dog.walks[dog.walks.length-1].date) <= DateTime.now().startOf("day"))
				);
	
				const dogsOrderedByDateDesc = dogsNotWalkedToday.sort((d1, d2) => {
					const d1Date = DateTime.fromISO(d1.walks[d1.walks.length-1].date);
					const d2Date = DateTime.fromISO(d2.walks[d2.walks.length-1].date);
					if (d1Date > d2Date) {
						return 1;
					} else if (d1Date < d2Date) {
						return -1;
					} else {
						return 0;
					}
				});
				
				// on met à jour les chiens à afficher
				setDogs([...dogsNeverWalked, ...dogsOrderedByDateDesc]);
				// on ferme la modale, on affiche le bouton revoir la liste
				setFilter(false);
				setReloadButton(true);
			}				
		} catch (error) {
			console.log(error);
		}
	};

	// réinitialisation du filtre
	const resetFilter = () => {
		setGabaritValue();
		setSexValue();
		setAges([0, 20]);
		setTags([]);
		setTagsList(dataTags);
	};

	// fermeture du filtre
	const closeFilter = () => {
		setFilter(false);
		setReloadButton(true);
	};

	const renderTag = (tag) => {
		// on récupère l'id du tag pour afficher le composant tag
		const tagId = Number(tag);
		const tagFound = dataTags.find((tag) => tag.id === tagId);
		return (
			<div 
				className='container-badge'
				key={tagId}
			>
				<Badge className="tag">{tagFound.name}</Badge>
				<CloseButton
					className="close-tag"
					onClick={() => cancelTag(tag)}
				/>
			</div>
		);
	};

	const updateGabarit = (gabarit) => {
		if (gabaritValue != undefined) {
			setGabaritValue(undefined);
		} else {
			setGabaritValue(gabarit);
		}
	};

	const updateSex = (sex) => {
		if (sexValue != undefined) {
			setSexValue(undefined);
		} else {
			setSexValue(sex);
		}
	};

	return (
		<Modal show={show} onHide={resetFilter}>
			<Modal.Header 
				closeButton
				onClick={closeFilter}
				>
				<Modal.Title>Filtres</Modal.Title>
			</Modal.Header>

				<Modal.Body>
					<div className='container-filter'>
						<div className='filter-part'>
							<h3 className='category'>Gabarit</h3>
							<ToggleButtonGroup
								type='checkbox'
								name='size'
								defaultValue={gabaritValue}
							>
								<ToggleButton
									id='tbg-radio-1'
									value='big'
									type='checkbox'
									disabled={gabaritValue != "big" && gabaritValue != undefined}
									onChange={(e) => updateGabarit(e.target.value)}
								>
									GROS
								</ToggleButton>
								<ToggleButton
									id='tbg-radio-2'
									value='medium'
									disabled={gabaritValue != "medium" && gabaritValue != undefined}
									onChange={(e) => updateGabarit(e.target.value)}
								>
									MOYEN
								</ToggleButton>
								<ToggleButton
									id='tbg-radio-3'
									value='small'
									disabled={gabaritValue != "small" && gabaritValue != undefined}
									onChange={(e) => updateGabarit(e.target.value)}
								>
									PETIT
								</ToggleButton>
							</ToggleButtonGroup>
						</div>

						<div className='filter-part'>
							<h3 className='category'>Sexe</h3>
							<ToggleButtonGroup
								type='checkbox'
								name='gender'
								defaultValue={sexValue}
							>
								<ToggleButton
									id='tbg-radio-4'
									value='male'
									disabled={sexValue != "male" && sexValue != undefined}
									onChange={(e) => updateSex(e.target.value)}
								>
									MALE
								</ToggleButton>
								<ToggleButton
									id='tbg-radio-5'
									value='female'
									disabled={sexValue != "female" && sexValue != undefined}
									onChange={(e) => updateSex(e.target.value)}
								>
									FEMELLE
								</ToggleButton>
							</ToggleButtonGroup>
						</div>

						<div className='filter-part'>
							<h3 className='category'>Age</h3>
								<DoubleThumbsRange 
									values={ages}
									setValues={setAges}
								/>
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
					<Button 
						className="reset-button"
						variant='secondary'
						onClick={resetFilter}
					>
						Réinitialiser les filtres
					</Button>
					<Button variant='primary' type='submit' onClick={handleOnSubmit}>
						Rechercher
					</Button>
				</Modal.Footer>

		</Modal>
	);
}

FilterDog.propTypes = {
	setDogs: PropTypes.func.isRequired,
	setFilter: PropTypes.func.isRequired,
	setReloadButton: PropTypes.func.isRequired,
	show: PropTypes.bool.isRequired,
	experience: PropTypes.string.isRequired,
};

export default React.memo(FilterDog);
