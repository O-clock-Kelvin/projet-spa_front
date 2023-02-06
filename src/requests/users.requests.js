import api from '../api';
const usersRequest = {

	getAllUsers: () => {
		return api.get('/users');
	},
	
	getProfile: (id) => {
		return api.get(`/users/${id}`);
	},

	update: (id, data) => {
		if (data.password == null) {
			delete data.password; // on retirer le champ si il est nul
		}
		delete data.id; // on supprime le champ id si il est passé dans l'objet data
		return api.patch(`/users/${id}`, data);
	},
};

export default usersRequest;
