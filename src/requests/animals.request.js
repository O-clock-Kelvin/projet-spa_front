import api from '../api';
import qs from 'qs';

const animalsRequest = {
	getAllAnimals: () => {
		return api.get(`/animals`);
	},

	getDogsByExperience: async (experience) => {
		switch (experience) {
			case 'BEGINNER':
				return api.get(
					`/animals?species=dog&volunteer_experience=beginner&include=walks&include=tags`
				);
			case 'MEDIUM':
				return api.get(
					`/animals?species=dog&volunteer_experience=beginner&volunteer_experience=medium&include=walks&include=tags`
				);
			case 'EXPERT':
				return api.get(`/animals?species=dog&include=walks&include=tags`);
			default:
				return api.get(
					`/animals?species=dog&volunteer_experience=beginner&include=walks&include=tags`
				);
		}
	},

	getDogsByFilter: async ({
		experience,
		gabaritValue,
		sexValue,
		startYearBirthday,
		endYearBirthday,
		tags,
	}) => {
		if (experience === 'EXPERT') {
			experience = undefined;
		}
		if (experience === 'MEDIUM') {
			experience = ['medium', 'beginner'];
		}
		let queryBuilder = {
			species: 'DOG',
			volunteer_experience: experience,
			size: gabaritValue,
			gender: sexValue,
			age: {
				lte: startYearBirthday,
				gte: endYearBirthday,
			},
			tagsList: tags.length > 0 ? tags : undefined,
			include: ['tags', 'walks'],
		};
		// Conversion de l'objet de query en string a passer dans la requête
		const query = qs.stringify(queryBuilder, {
			skipNulls: true,
		});
		return api.get(`/animals?${query}`);
	},

	getAnimalsBySpecies: (species) => {
		let queryBuilder = {
			species: species,
		};
		const query = qs.stringify(queryBuilder, {
			skipNulls: true,
		});
		return api.get(`/animals?${query}`);
	},

	// recupère un animal selon son id
	get: (id, options) => {
		// Création de la liste des includes
		let includes = [];
		options?.includeTags && includes.push('tags');
		options?.includeWalks && includes.push('walks');
		options?.includeBox && includes.push('box');
		// Création des objets à inclure dans la query
		let queryBuilder = {
			include: includes,
		};
		// Conversion de l'objet de query en string a passer dans la requête
		const query = qs.stringify(queryBuilder, {
			skipNulls: true,
			arrayFormat: 'comma',
		});
		return api.get(`/animals/${id}?${query}`);
	},

	// récupère les balades d'un chien selon son id
	getWalks: (animal_id, cursor) => {
		// Création des objets à inclure dans la query
		let queryBuilder = {
			cursor: cursor !== undefined ? cursor : undefined,
		};
		// Conversion de l'objet de query en string a passer dans la requête
		const query = qs.stringify(queryBuilder, {
			skipNulls: true,
		});
		return api.get(`/animals/${animal_id}/walks?${query}`);
	},
};

export default animalsRequest;
