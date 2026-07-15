import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
    baseURL: API_URL,
});

export const analyzeResume = async (formData) => {
    const response = await api.post('/analyze', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    return response.data;
};

export const getHistory = async () => {
    const response = await api.get('/history');
    return response.data;
};

export const getHistoryById = async (id) => {
    const response = await api.get(`/history/${id}`);
    return response.data;
};

export const deleteHistoryById = async (id) => {
    const response = await api.delete(`/history/${id}`);
    return response.data;
};

export default api;
