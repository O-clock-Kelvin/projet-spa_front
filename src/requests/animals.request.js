import api from '../api';
import qs from 'qs';

const animalsRequest = {
	get: (id, options) => {
		/**
		 * Création de la liste des includes
		 */
		let includes = [];
		options?.includeTags && includes.push('tags');
		options?.includeWalks && includes.push('walks');

		/**
		 * Création des objets à inclure dans la query
		 */
		let queryBuilder = {
			include: includes,
		};

		/**
		 * Conversion de l'objet de query en string a passer dans la requête
		 */
		const query = qs.stringify(queryBuilder, {
			skipNulls: true,
			arrayFormat: 'comma',
		});

		return api.get(`/animals/${id}?${query}`);
	},

	getWalks: (animal_id, cursor) => {
		/**
		 * Création des objets à inclure dans la query
		 */

		let queryBuilder = {
			cursor: cursor !== undefined ? cursor : undefined,
		};

		/**
		 * Conversion de l'objet de query en string a passer dans la requête
		 */
		const query = qs.stringify(queryBuilder, {
			skipNulls: true,
		});

		return api.get(`/animals/${animal_id}/walks?${query}`);
	},
};

export default animalsRequest;
