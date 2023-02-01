import { DateTime } from 'luxon';
import api from '../api';

const visitsRequest = {
	create: async (user_id, box_id) => {
		if (user_id && box_id) {
			return api.post('/visits', {
				box_id: box_id,
				user_id: user_id,
				date: DateTime.now().toISO(),
			});
		}
	},

	update: async (visit_id, data) => {
		let updatedVisit = data;
		delete updatedVisit.id;
		return api.patch(`/visits/${visit_id}`, updatedVisit);
	},
};
export default visitsRequest;
