import { useState } from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import animalsRequest from '../../requests/animals.request';
import PropTypes from 'prop-types';

import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import './AnimalPage.scss';

import StartWalkButton from '../../components/WalkStartButton/WalkStartButton';
import AnimalWalksList from '../../components/AnimalWalksList';
import BoxVisitsList from '../../components/BoxVisitsList/BoxVisits';

const TagsList = ({ tags }) => {
	if (tags) {
		return (
			<ul className='tag'>
				{tags.map((tag) => (
					<li key={tag.tag_id}>{tag.tag.name}</li>
				))}
			</ul>
		);
	} else {
		/**
		 * @todo check si il faut afficher quelque chose si l'animal n'a pas de tags
		 */
		return null;
	}
};
TagsList.propTypes = {
	tags: PropTypes.array,
};

const renderDefaultAnimalPicture = (specie) => {
	switch (specie) {
		case 'CAT':
			return 'https://api.kyivindependent.com/storage/2021/12/loveyoustepan.-instagram-1200x630.jpg';
		case 'DOG':
			return 'https://images.dog.ceo/breeds/appenzeller/n02107908_2809.jpg';
		default:
			return 'https://play-lh.googleusercontent.com/8QnH9AhsRfhPott7REiFUXXJLRIxi8KMAP0mFAZpYgd44OTOCtScwXeb5oPe1E4eP4oF';
	}
};

const AnimalPage = () => {
	let { animalId } = useParams();
	const [animal, setAnimal] = useState();
	// use query
	const { error, isLoading } = useQuery('getAnimal', {
		queryFn: async () =>
			animalsRequest.get(animalId, {
				includeTags: true,
				includeWalks: true,
			}),

		onSuccess: (data) => {
			setAnimal(data.data);
		},
	});

	const errorHandler = (error) => {
		if (error && error.response?.data?.message) {
			switch (error.response.data.message) {
				case 'NOT_FOUND':
					return "Cet animal n'existe pas";
				case 'BAD_INPUT':
					return 'Erreur de requête. Merci de retenter plus tard';
				default:
					return 'Erreur du srveur, merci de retenter plus tard';
			}
		} else {
			return 'Erreur du serveur, merci de retenter plus tard';
		}
	};

	if (!isLoading) {
		if (animal) {
			return (
				<>	
					<h1 className ='title-page'>Fiche de {animal.name}</h1>

				<Container className='animal-container'>
					<Row>
						<Col className='animal-information' lg={4}>
							<div >
								<Image className='rounded'
									width={200}
									src={
										animal.url_image || renderDefaultAnimalPicture(animal.species)
									}
									alt={animal.name}
								/>
								
									<TagsList tags={animal.tags} />
								
								<span> {animal.species == 'DOG' ? 'cage' : 'box'}: {animal.box_id} </span>
								<br />
								{animal.species === 'DOG' && <StartWalkButton animal={animal} />}
							</div>
						</Col>
						<Col>
							<Container>
								<Row>
									<Col>
										<div>
											<h4 className="subtitle-page">Biographie</h4>
											<div className='animal-bio'>{animal.bio ?? "Cet animal n'a pas de bio"}</div>
										</div>
									</Col>
								</Row>
								<Row>
									<Col>
									{animal.species === 'DOG' && (
										<>
											<h4 className="subtitle-page">Dernières balades</h4>
											<AnimalWalksList animalId={animal.id} />
										</>
									)}
									{animal.species === 'CAT' && (
										<>
											<h4>Dernières visites du box</h4>
											<BoxVisitsList boxId={animal.box_id} />
										</>
									)}
									</Col>
								</Row>
							</Container>
						</Col>
					</Row>
				</Container>
			</>
			);
		} else {
			return (
				<div>
					<p>Erreur lors du chargement de la page de l'animal... </p>
					{errorHandler(error)}
				</div>
			);
		}
	} else {
		/**
		 * @todo better loading screen
		 */
		return <p>Loading...</p>;
	}
};

export default AnimalPage;
