import api from '../api';

export const getDogsByExperience = async (experience) => {
	console.log("toto");
	return api.get(`/animals?species=dog&volunteer_experience=${experience}&include=walks&include=tags`);
};

export const getDogsByFilter = async (experience, gabaritValue, sexValue, startYearBirthday, endYearBirthday, tags) => {
	console.log(experience, gabaritValue, sexValue, startYearBirthday, endYearBirthday, tags);
	return api.get(`/animals?species=dog&volunteer_experience=${experience}&size=${gabaritValue}&gender=${sexValue}
					&age[gte]=${startYearBirthday}&age[lte]=${endYearBirthday}
					&tagSList=${tags}
					&include=tags&include=walks&include=tags`);
};