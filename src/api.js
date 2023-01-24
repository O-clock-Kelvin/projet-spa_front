import axios from "axios";

// création d'une instance d'axios
const api = axios.create({
    baseURL:`${process.env.REACT_APP_API_URL}:${process.env.REACT_APP_API_PORT}/v1`
});


export default api;