import { 
    Fighter, 
    FighterCreate, 
    FighterUpdate, 
    FightEvent, 
    FightEventCreate,
    HeroSlide,
    HeroSlideCreate,
    Referee,
    RefereeCreate,
    RefereeUpdate,
    FighterProfile
} from '@/types';
import axios from 'axios';

const BACKEND_URL = 'https://cfc-backend-ten.vercel.app';

const getBaseURL = () => {
    if (typeof window === 'undefined') {
        // Server-side: call backend directly
        return BACKEND_URL;
    }
    // Client-side: use local proxy
    return '/api/proxy';
};

const api = axios.create({
    baseURL: getBaseURL(),
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
});

// Auth
export const loginAdmin = async (username: string, password: string) => {
    try {
        const formData = new URLSearchParams();
        formData.append('username', username);
        formData.append('password', password);
        
        const response = await api.post('/auth/login', formData, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });
        return response.data;
    } catch (error: any) {
        console.error('Login Error:', error.response?.data || error.message);
        throw error;
    }
};

export const getCurrentUser = async () => {
    try {
        const response = await api.get('/auth/me');
        return response.data;
    } catch (error: any) {
        console.error('API Error:', error.response?.data || error.message);
        throw error;
    }
};

// Fighters
export const createFighter = async (fighter: FighterCreate) => {
    try {
        const response = await api.post('/fighters/', fighter);
        return response.data;
    } catch (error: any) {
        console.error('API Error:', error.response?.data || error.message);
        throw error;
    }
};

export const updateFighter = async (id: string, fighter: FighterUpdate) => {
    try {
        const response = await api.put(`/fighters/${id}/`, fighter);
        return response.data;
    } catch (error: any) {
        console.error('API Error:', error.response?.data || error.message);
        throw error;
    }
};

export const deleteFighter = async (id: string) => {
    try {
        const response = await api.delete(`/fighters/${id}/`);
        return response.data;
    } catch (error: any) {
        console.error('API Error:', error.response?.data || error.message);
        throw error;
    }
};

export const getAllFighters = async (filters?: { name?: string; weight_class?: string; nationality?: string }) => {
    try {
        const response = await api.get('/fighters/', { params: filters });
        return response.data;
    } catch (error: any) {
        console.error('API Error:', error.response?.data || error.message);
        throw error;
    }
};

export const getFighterById = async (id: string) => {
    try {
        const response = await api.get(`/fighters/${id}/`);
        return response.data as FighterProfile;
    } catch (error: any) {
        console.error('API Error:', error.response?.data || error.message);
        throw error;
    }
};

// Referees
export const createReferee = async (referee: RefereeCreate) => {
    try {
        const response = await api.post('/referees/', referee);
        return response.data;
    } catch (error: any) {
        console.error('API Error:', error.response?.data || error.message);
        throw error;
    }
};

export const getAllReferees = async () => {
    try {
        const response = await api.get('/referees/');
        return response.data;
    } catch (error: any) {
        console.error('API Error:', error.response?.data || error.message);
        throw error;
    }
};

export const getRefereeById = async (id: string) => {
    try {
        const response = await api.get(`/referees/${id}/`);
        return response.data;
    } catch (error: any) {
        console.error('API Error:', error.response?.data || error.message);
        throw error;
    }
};

export const updateReferee = async (id: string, referee: RefereeUpdate) => {
    try {
        const response = await api.put(`/referees/${id}/`, referee);
        return response.data;
    } catch (error: any) {
        console.error('API Error:', error.response?.data || error.message);
        throw error;
    }
};

export const deleteReferee = async (id: string) => {
    try {
        const response = await api.delete(`/referees/${id}/`);
        return response.data;
    } catch (error: any) {
        console.error('API Error:', error.response?.data || error.message);
        throw error;
    }
};

// Events
export const createEvent = async (event: FightEventCreate) => {
    try {
        const response = await api.post('/events/', event);
        return response.data;
    } catch (error: any) {
        console.error('API Error:', error.response?.data || error.message);
        throw error;
    }
};

export const updateEvent = async (id: string, event: Partial<FightEvent>) => {
    try {
        const response = await api.put(`/events/${id}/`, event);
        return response.data;
    } catch (error: any) {
        console.error('API Error:', error.response?.data || error.message);
        throw error;
    }
};

export const deleteEvent = async (id: string) => {
    try {
        const response = await api.delete(`/events/${id}/`);
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

// Upload
export const uploadImage = async (file: File, folder: string = 'media') => {
    try {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('folder', folder);

        const response = await fetch('/api/proxy/upload', {
            method: 'POST',
            body: formData
        });

        if (!response.ok) {
            throw new Error('Image upload failed');
        }

        const data = await response.json();
        return data.url;
    } catch (error: any) {
        console.error('Upload Error:', error.message);
        throw error;
    }
};

// Hero Slides
export const createHeroSlide = async (heroSlide: HeroSlideCreate) => {
    try {
        const response = await api.post('/hero-slides/', heroSlide);
        return response.data;
    } catch (error: any) {
        console.error('API Error:', error.response?.data || error.message);
        throw error;
    }
};

export const updateHeroSlide = async (id: string, heroSlide: Partial<HeroSlide>) => {
    try {
        const response = await api.put(`/hero-slides/${id}/`, heroSlide);
        return response.data;
    } catch (error: any) {
        console.error('API Error:', error.response?.data || error.message);
        throw error;
    }
};

export const deleteHeroSlide = async (id: string) => {
    try {
        const response = await api.delete(`/hero-slides/${id}/`);
        return response.data;
    } catch (error: any) {
        console.error('API Error:', error.response?.data || error.message);
        throw error;
    }
};

export const getAllHeroSlides = async () => {
    try {
        const response = await api.get('/hero-slides/');
        return response.data;
    } catch (error: any) {
        console.error('API Error:', error.response?.data || error.message);
        throw error;
    }
};

export const getHeroSlideById = async (id: string) => {
    try {
        const response = await api.get(`/hero-slides/${id}/`);
        return response.data;
    } catch (error: any) {
        console.error('API Error:', error.response?.data || error.message);
        throw error;
    }
};

