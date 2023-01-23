import axios from "axios";

// création d'une instance d'axios
const api = axios.create({
    baseURL: 'http://localhost:3005/v1'
});

export default api;