import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import store from "../store";

export const REJECTED = "users/fetchByIEmail/rejected";
export const FULFILLED = "users/fetchByIEmail/fulfilled";
export const PENDING = "users/fetchByIEmail/pending";

export const actionLoginFetch = createAsyncThunk(
    'users/fetchByEmail',
    async ({email, password}) => {
        const {data} = await axios.post('http://localhost:3001/login', {
            email : email,
            password : password,
        });
        if (data) {
            store.dispatch(actionLoginSuccess(email, data.pseudo));
        }
        return data;
    }
);

export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const actionLoginSuccess = (email, pseudo) => ({type: LOGIN_SUCCESS, payload: {email, pseudo}});