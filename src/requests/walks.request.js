import { DateTime } from 'luxon';
import api from '../api';

const walksRequest = {
	create: async (user_id, animal_id) => {
		if (user_id && animal_id) {
			return api.post('/walks', {
				animal_id: animal_id,
				user_id: user_id,
				date: DateTime.now().toISO(),
			});
		}
	},

	update: async (walk_id, data) => {
		let updatedWalk = data;
		delete updatedWalk.id;
		return api.patch(`/walks/${walk_id}`, updatedWalk);
	},
};
export default walksRequest;
