import api from '../api';

export const getDogsByExperience = async (experience) => {
	return api.get(`/animals?species=dog&volunteer_experience=${experience}&include=walks`);
};

export const getDogsByFilter = async (experience, gabaritValue, sexValue) => {
	console.log(experience, gabaritValue, sexValue);
	return api.get(`/animals?species=dog&volunteer_experience=${experience}&size=${gabaritValue}&gender=${sexValue}&include=tags&include=walks`);
};


// /animals?date[gte]=debut_annee_naissance&date[lte]=fin_annee_naissance