import axios from 'axios';

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_URL || 'http://127.0.0.1:8000',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
});


export const getAllFighters = async () => {
    try {
        const response = await api.get('/fighters/');
        console.log('API Response data:', response.data);
        return response.data;
    } catch (error) {
        console.error('API Error:', error);
        throw error;
    }
};
