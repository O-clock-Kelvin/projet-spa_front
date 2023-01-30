import api from '../api';
import qs from 'qs';

const boxesRequest = {
	getVisits: (box_id, cursor) => {
		/**
		 * Création de la liste des includes
		 */

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
};

export default boxesRequest;
