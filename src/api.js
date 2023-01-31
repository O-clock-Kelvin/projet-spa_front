import axios from 'axios';

// création d'une instance d'axios
export const getToken = () =>
	localStorage.getItem('token')
		? JSON.parse(localStorage.getItem('token'))
		: null;

const api = axios.create({
	baseURL: `${process.env.REACT_APP_API_URL}/v1`,
});

// Middleware axios qui permet de conserver le token lors de chaque requête au back
api.interceptors.request.use((config) => {
	config.headers['Authorization'] = `Bearer ${getToken()}`;
	console.log('CONFIG', config);
	return config;
});

export default api;
