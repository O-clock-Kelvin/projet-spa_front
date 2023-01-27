/** @format */

import api from '../api';

export const getDogs = async () => {
	// const { data } = await api.get(
	// 	'/animals?species=dog&volunteer_experience=medium'
	// );
	// // console.log(data);
	// return data;

	return api.get('/animals?species=dog&volunteer_experience=medium');
};
