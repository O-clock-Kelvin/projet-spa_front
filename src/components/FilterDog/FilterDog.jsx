/** @format */

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

// import { useQuery } from 'react-query';

// composants
import { ToggleButtonGroup, CloseButton, ToggleButton, Form, Modal, Button, Badge } from 'react-bootstrap';

// fonctions
import { convertAgeInIntervalDate } from '../../utils/convert';

// data
import dataTags from '../../data/tags';

// styles
import './styles.scss';
import { useSelector } from 'react-redux';
function FilterDog({
	getDogsByFilter,
	setFilteredDogs,
	setFilter,
	setReloadButton
}) {

	const experience = useSelector((fullstate) => fullstate.loginSettings.experience);

	const [gabaritValue, setGabaritValue] = useState('big');
	const [sexValue, setSexValue] = useState('male');
	const [valueAge, setvalueAge] = useState(5);
	const [tags, setTags] = useState([]);
	const [tagsList, setTagsList] = useState(dataTags);

	const handleOnChangeGabarit = (e) => {
		console.log(e.target.value);
		setGabaritValue(e.target.value);
	};

	const handleOnChangeSex = (e) => {
		console.log(e.target.value);
		setSexValue(e.target.value);
	};

	const handleOnAddTag = (e) => {
		console.log(e.target.value);
		console.log(tagsList);
		setTagsList((oldState) =>
			oldState.filter((tag) =>
				tag.id !== Number(e.target.value)
			)
		);
		setTags((oldState) => [...oldState, e.target.value]);
	};

	const cancelTag = (tagToCancel) => {
		console.log(tagToCancel);
		
		setTags((oldState) => 
			oldState.filter((tag) =>
				tag !== tagToCancel
			)
		);
		const oldTag = dataTags.filter((tag) => tag.id == tagToCancel);
		console.log(oldTag);
		setTagsList((oldState) => [...oldState, oldTag[0]]);
	};

	useEffect(() => {
		console.log(tags);
	}, [tags]);

	const handleOnSubmit = async (e) => {
		e.preventDefault();

        // conversion de l'age en un intervalle de dates (3ans => né entre le 01/01/2020 et le 31/12/2020)
		const {startYearBirthday, endYearBirthday} = convertAgeInIntervalDate(valueAge);
	
		// requête pour récupérer la nouvelle liste des chiens avec les filtres
		const data = await getDogsByFilter(experience, gabaritValue, sexValue, startYearBirthday, endYearBirthday, tags);
		console.log(data);
		setFilteredDogs(data.data);
		setFilter(false);
		setReloadButton(true);
	};

	const cancelFilter = () => {
		// document.getElementById("filter-form").reset();
		setFilter(false);
		console.log(experience, gabaritValue, sexValue, tags);
	};

	const renderTag = (tag) => {
		const tagId = Number(tag);
		const tagFound = dataTags.find((tag) => tag.id === tagId);		
		return (
			<div className='container-badge'>
				<Badge>
					{tagFound.name}
				</Badge>
				<CloseButton
					onClick={() => cancelTag(tag)}
				/>
			</div>	
		);
	};

	return (
		<div className='modal show' style={{ display: 'block', position: 'fixed' }}>
			<Modal.Dialog>
				<Modal.Header>
					<Modal.Title>Filtres</Modal.Title>
				</Modal.Header>

				<Form onSubmit={handleOnSubmit} id="filter-form">
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
										onChange={handleOnChangeGabarit}
									>
										GROS
									</ToggleButton>
									<ToggleButton
										id='tbg-radio-2'
										value='medium'
										onChange={handleOnChangeGabarit}
									>
										MOYEN
									</ToggleButton>
									<ToggleButton
										id='tbg-radio-3'
										value='small'
										onChange={handleOnChangeGabarit}
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
										onChange={handleOnChangeSex}
									>
										MALE
									</ToggleButton>
									<ToggleButton
										id='tbg-radio-5'
										value='female'
										onChange={handleOnChangeSex}
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
									<option >Sélectionner</option>
									{
										tagsList.map((tag) => <option key={tag.id} value={`${tag.id}`}>{tag.name}</option>)
									}							
								</Form.Select>
					
								<div className='tags-container'>
									{tags &&
										(tags.map((tag) => renderTag(tag)))
									}
								</div>
								
							</div>
						</div>
					</Modal.Body>

					<Modal.Footer>
						<Button 
							variant='secondary'
							onClick={cancelFilter}
						>
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
	getDogsByFilter: PropTypes.func.isRequired,
	setFilteredDogs: PropTypes.func.isRequired, 
	setFilter: PropTypes.func.isRequired,
	setReloadButton: PropTypes.func.isRequired,
};

export default React.memo(FilterDog);
