/** @format */

import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import animalsRequest from '../../requests/animals.request';
import PropTypes from 'prop-types';
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

const AnimalPage = () => {
	let { animalId } = useParams();
	const [animal, setAnimal] = useState();
	// use query
	const { data, error, isLoading } = useQuery('getAnimal', {
		queryFn: async () =>
			animalsRequest.get(animalId, {
				includeTags: true,
				includeWalks: true,
			}),
		onSuccess: (data) => {
			setAnimal(data.data);
		},
	});

	useEffect(() => {
		console.log('REQ', data, error, isLoading);
	}, [data, error, isLoading]);

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
								animal.photo_url ||
								'https://images.dog.ceo/breeds/appenzeller/n02107908_2809.jpg'
							}
							alt={animal.name}
						/>
						<TagsList tags={animal.tags} />
						cage: {animal.box_id}
						<p>{JSON.stringify(animal)}</p>
					</div>
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
