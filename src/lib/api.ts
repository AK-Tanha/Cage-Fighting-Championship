import axios from 'axios';

// The proxy prefix handles CORS issues by bridging to the real backend server-side
const api = axios.create({
    baseURL: '/api/proxy',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
});

export const getAllFighters = async () => {
    try {
        const response = await api.get('/fighters/');
        return response.data;
    } catch (error: any) {
        console.error('API Error:', error.response?.data || error.message);
        throw error;
    }
};

export const getFighterById = async (id: string) => {
    try {
        const response = await api.get(`/fighters/${id}/`);
        return response.data;
    } catch (error: any) {
        console.error('API Error:', error.response?.data || error.message);
        throw error;
    }
};

export const getAllEvents = async () => {
    try {
        const response = await api.get('/events/');
        return response.data;
    } catch (error: any) {
        console.error('API Error:', error.response?.data || error.message);
        throw error;
    }
};

export const getEventById = async (id: string) => {
    try {
        const response = await api.get(`/events/${id}/`);
        return response.data;
    } catch (error: any) {
        console.error('API Error:', error.response?.data || error.message);
        throw error;
    }
};
