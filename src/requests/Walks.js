import api from '../api';

export const getWalksByDog = async (idDog) => {
	return api.get(`/walks?animal_id=${idDog}`);
};