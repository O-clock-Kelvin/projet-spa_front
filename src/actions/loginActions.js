import { createAsyncThunk } from "@reduxjs/toolkit";
import api from '../api';

// définition d' une variable pour chaque retour possible de la requête
export const LOGIN_PENDING = "users/fetchByEmail/pending";
export const LOGIN_FULFILLED = "users/fetchByEmail/fulfilled";
export const LOGIN_REJECTED = "users/fetchByEmail/rejected";

// createAsyncThunk = fonction de redux qui prend une action et retourne une promise
// requête qui vérifie que l'email et le password entrés correspondent à un utilisateur
export const actionLoginFetch = createAsyncThunk(
    'users/fetchByEmail',
    async ({email, password}) => {
        console.log(email, password);
        const {data} = await api.post('/auth/login', {
            email : email,
            password : password,
        });
        // envoi du token
        console.log(data);
        api.defaults.headers.common.Authorization = `Bearer ${data.token}`; 
        return {token: data.token};
    }
);
