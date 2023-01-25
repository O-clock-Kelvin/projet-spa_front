import { LOGIN_FULFILLED, LOGIN_PENDING, LOGIN_REJECTED, LOGOUT } from "../actions/loginActions";
import { SET_TOKEN } from "../actions/tokenAction";

const initialState = {
    token: null,
    admin: false,
    firstName: "",
    experience: "",
    isLoading: false,
    isConnected: false,
    noAutorisation: false,
};

// le reducer reçoit l'action.type, et selon le cas modifie ou non le state de redux
const loginSettingsReducer = ( state = initialState, action = {}) => {
    switch (action.type) {
        case LOGIN_PENDING: {  
            console.log(LOGIN_PENDING);
            return {
                ...state,
                isLoading: true,
            };
        }
        case LOGIN_FULFILLED: {
            console.log(LOGIN_FULFILLED);
            return {
                ...state,
                token: action.payload.token,
                admin: false,
                firstName: action.payload.firstName,
                experience: action.payload.experience,
                isLoading: false,
                noAutorisation: false,
                isConnected: true,
            };
        }  
        case SET_TOKEN : {
            console.log(SET_TOKEN);
            return {
                ...state,
                token: action.payload.token,
                admin: false,
                firstName: action.payload.firstName,
                experience: action.payload.experience,
                isLoading: false,
                noAutorisation: false,
                isConnected: true,
            };
        }
        case LOGIN_REJECTED: {
            console.log(LOGIN_REJECTED);
            return {
                ...state,
                isLoading: false,
                isConnected: false,
                noAutorisation: true,
                token: null
            };
        }
        case LOGOUT: {
            return {
                ...state,
                admin: false,
                firstName: "",
                experience: "",
                isLoading: false,
                isConnected: false,
                noAutorisation: false,
                token: null,
            };
        }
        default: {
            console.log("requête non aboutie");
            return state;
        }
    }
};

export default loginSettingsReducer;