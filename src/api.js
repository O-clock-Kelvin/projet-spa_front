import axios from 'axios';

// création d'une instance d'axios
export const getToken = () =>
	localStorage.getItem('token')
		? JSON.parse(localStorage.getItem('token'))
		: null;

const api = axios.create({
	baseURL: `${process.env.REACT_APP_API_URL}/v1`,
	headers: {
		Authorization: `Bearer ${getToken()}`,
	},
});

export default api;
