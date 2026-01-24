import axios from 'axios';

const api = axios.create({
    baseURL: process.env.API_KEY || 'http://127.0.0.1:8000',
});

export const getAllFighters = async () => {
    const { data } = await api.get('/fighters/');
    return data;
};