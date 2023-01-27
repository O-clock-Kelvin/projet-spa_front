import api from '../api';

export const getDogsByExperience = async (experience) => {
	return api.get(`/animals?species=dog&volunteer_experience=${experience}`);
};

export const getDogsByFilter = async (experience, gabaritValue, sexValue, tags, startYearBirthday, endYearBirthday) => {
	console.log(experience, gabaritValue, sexValue, tags, startYearBirthday, endYearBirthday);
	return api.get(`/animals?species=dog&volunteer_experience=${experience}`);
};


// /animals?date[gte]=debut_annee_naissance&date[lte]=fin_annee_naissance