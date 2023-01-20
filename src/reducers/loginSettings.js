import { FULFILLED, LOGIN_SUCCESS } from "../actions/loginActions";

const initialState = {
    email: "",
    pseudo: "",
};

const loginSettingsReducer = ( state = initialState, action = {}) => {
    switch (action.type) {
        case FULFILLED: {
            return state;
        }

        case LOGIN_SUCCESS: {
            return {
                ...state,
                email: action.type.email,
                pseudo: action.type.pseudo,
            };
        }

        default: {
            return state;
        }
    }
};

export default loginSettingsReducer;