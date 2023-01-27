import api from '../api';

export const getDogs = async () => {
    try {
        const { data } = await api.get('/animals?species=dog&volunteer_experience=medium');
        console.log(data);
        return data; 
    } catch (error) {
        console.log(error);
    } 
};
