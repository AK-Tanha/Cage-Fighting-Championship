import axios from 'axios';

const api = axios.create({
    baseURL: '', // Uses relative path to leverage Vite proxy
});

export const getAllFighters = async () => {
    const { data } = await api.get('/fighters/');
    return data;
};