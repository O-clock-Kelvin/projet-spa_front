import api from '../api';
import qs from 'qs';

const boxesRequest = {
	getVisits: (box_id, cursor) => {
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

		return api.get(`/boxes/${box_id}/visits?${query}`);
	},

	/**
	 * Récupération des informations d'une box
	 */
	get: (box_id, options) => {
		let includes = [];
		options?.includeAnimals && includes.push('animals');
		options?.includeVisits && includes.push('visits');

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
		return api.get(`/boxes/${box_id}?${query}`);
	},
};

export default boxesRequest;
