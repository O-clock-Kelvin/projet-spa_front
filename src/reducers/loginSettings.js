import { LOGIN_FULFILLED, LOGIN_PENDING, LOGIN_REJECTED } from "../actions/loginActions";

const initialState = {
    token: "",
    isLoading: false,
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
                isLoading: false,
                noAutorisation: false,
            };
        }
        case LOGIN_REJECTED: {
            console.log(LOGIN_REJECTED);
            return {
                ...state,
                isLoading: false,
                noAutorisation: true,
            };
        }
        default: {
            console.log("requête non aboutie");
            return state;
        }
    }
};

export default loginSettingsReducer;