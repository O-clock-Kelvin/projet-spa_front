export const SET_TOKEN = 'SET_TOKEN';
export const actionSetToken = (token) => {
    console.log(token);
    return ({
        type: SET_TOKEN, payload: token
    });
};