/** @format */

import {
	LOGIN_FULFILLED,
	LOGIN_PENDING,
	LOGIN_REJECTED,
	LOGOUT,
} from '../actions/loginActions';

import { SET_TOKEN, TOKEN_CHECKED } from '../actions/tokenAction';

const initialState = {
	token: localStorage.getItem('token'),
	id: null,
	admin: false,
	firstName: '',
	experience: '',
	isLoading: false,
	isConnected: false,
	noAutorisation: false,
	authLoaded: false,
};

// le reducer reçoit l'action.type, et selon le cas modifie ou non le state de redux
const loginSettingsReducer = (state = initialState, action = {}) => {
	switch (action.type) {
		case LOGIN_PENDING: {
			return {
				...state,
				isLoading: true,
			};
		}
		case LOGIN_FULFILLED: {
			return {
				...state,
				token: action.payload.token,
				id: action.payload.id,
				admin: action.payload.admin,
				firstName: action.payload.firstName,
				experience: action.payload.experience,
				isLoading: false,
				noAutorisation: false,
				isConnected: true,
			};
		}
		case SET_TOKEN: {
			return {
				...state,
				token: action.payload.token,
				id: action.payload.id,
				admin: action.payload.admin,
				firstName: action.payload.firstName,
				experience: action.payload.experience,
				isLoading: false,
				noAutorisation: false,
				isConnected: true,
				// authLoaded:true,
			};
		}
		case TOKEN_CHECKED: {
			return {
				...state,
				authLoaded: true,
			};
		}
		case LOGIN_REJECTED: {
			return {
				...state,
				isLoading: false,
				isConnected: false,
				noAutorisation: true,
				token: null,
			};
		}
		case LOGOUT: {
			return {
				...state,
				id: null,
				admin: false,
				firstName: '',
				experience: '',
				isLoading: false,
				isConnected: false,
				noAutorisation: false,
				token: null,
			};
		}

		default: {
			return state;
		}
	}
};

export default loginSettingsReducer;
