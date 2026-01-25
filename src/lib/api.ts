import axios from 'axios';

const api = axios.create({
    // Using relative paths to leverage Next.js rewrites in next.config.ts.
    // This avoids CORS errors by proxying requests through the Next.js server.
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
