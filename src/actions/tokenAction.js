/** @format */

// gestion du token
import jwt_decode from 'jwt-decode';

export const SET_TOKEN = 'SET_TOKEN';
export const TOKEN_CHECKED = 'TOKEN_CHECKED';
export const actionSetToken = (token) => {
	// décryptage du token
	const decodedToken = jwt_decode(token);
	return {
		type: SET_TOKEN,
		payload: {
			id: decodedToken.id,
			admin: decodedToken.admin,
			firstName: decodedToken.firstName,
			experience: decodedToken.experience,
			token: token,
		},
	};
};

export const actionTokenChecked = () => {
	return {
		type: TOKEN_CHECKED,
	};
};
