// import api from '../api';
// import qs from 'qs';


// export const getDogsByExperience = async (experience) => {
// 	return api.get(
// 		`/animals?species=dog&volunteer_experience=${experience}&include=walks&include=tags`
// 	);
// };

// export const getDogsByFilter = async (experience, gabaritValue, sexValue, startYearBirthday, endYearBirthday, tags) => {
// 	let queryBuilder = {
// 		species: 'DOG',
// 		volunter_experience: experience,
// 		size: gabaritValue,
// 		gender: sexValue,
// 		age: {
// 			gte: startYearBirthday,
// 			lte: endYearBirthday,
// 		},
// 		tagsList: tags.length > 0 ? tags : undefined,
// 		include: ['tags', 'walks'],
// 	};

// 	/**
// 	 * Conversion de l'objet de query en string a passer dans la requête
// 	 */
// 	const query = qs.stringify(queryBuilder, {
// 		skipNulls: true,
// 	});
// 	return api.get(`/animals?${query}`);
// };