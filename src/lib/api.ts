import { Fighter, FightEvent } from '@/types';
import axios from 'axios';

// The proxy prefix handles CORS issues by bridging to the real backend server-side
const api = axios.create({
    baseURL: '/api/proxy',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
});

//fighters
export const createFighter = async (fighter: Fighter) => {
    try {
        const response = await api.post('/fighters/', fighter);
        return response.data;
    } catch (error: any) {
        console.error('API Error:', error.response?.data || error.message);
        throw error;
    }
}
export const updateFighter = async (fighter: Fighter) => {
    try {
        const response = await api.put(`/fighters/${fighter._id}/`, fighter);
        return response.data;
    } catch (error: any) {
        console.error('API Error:', error.response?.data || error.message);
        throw error;
    }
}
export const deleteFighter = async (id: string) => {
    try {
        const response = await api.delete(`/fighters/${id}/`);
        return response.data;
    } catch (error: any) {
        console.error('API Error:', error.response?.data || error.message);
        throw error;
    }
}

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



//events

export const createEvent = async (event: FightEvent) => {
    try {
        const response = await api.post('/events/', event);
        return response.data;
    } catch (error: any) {
        console.error('API Error:', error.response?.data || error.message);
        throw error;
    }
}
export const updateEvent = async (event: FightEvent) => {
    try {
        const response = await api.put(`/events/${event._id}/`, event);
        return response.data;
    } catch (error: any) {
        console.error('API Error:', error.response?.data || error.message);
        throw error;
    }
}
export const deleteEvent = async (id: string) => {
    try {
        const response = await api.delete(`/events/${id}/`);
        return response.data;
    } catch (error: any) {
        console.error('API Error:', error.response?.data || error.message);
        throw error;
    }
}

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
