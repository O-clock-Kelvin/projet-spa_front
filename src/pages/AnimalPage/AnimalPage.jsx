import { useState } from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import animalsRequest from '../../requests/animals.request';
import PropTypes from 'prop-types';

import StartWalkButton from '../../components/WalkStartButton/WalkStartButton';
import AnimalWalksList from '../../components/AnimalWalksList';
import BoxVisitsList from '../../components/BoxVisitsList/BoxVisits';

const TagsList = ({ tags }) => {
	if (tags) {
		return (
			<ul>
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
					<h1>Page de {animal.name}</h1>
					<div>
						<img
							width={200}
							src={
								animal.url_image || renderDefaultAnimalPicture(animal.species)
							}
							alt={animal.name}
						/>
						<TagsList tags={animal.tags} />
						{animal.species == 'DOG' ? 'cage' : 'box'}: {animal.box_id}
						<br />
						{animal.species === 'DOG' && <StartWalkButton animal={animal} />}
					</div>
					<div>
						<h4>Notes sur l'animal</h4>
						<div>{animal.bio ?? "Cet animal n'a pas de bio"}</div>
					</div>

					{animal.species === 'DOG' && (
						<>
							<h4>Dernières balades</h4>
							<AnimalWalksList animalId={animal.id} />
						</>
					)}
					{animal.species === 'CAT' && (
						<>
							<h4>Dernières visites du box</h4>
							<BoxVisitsList boxId={animal.box_id} />
						</>
					)}
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
