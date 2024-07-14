import axios from 'axios';

const API_URL = 'localhost:8080/api';

const config = {
    headers: { Authorization: `Bearer test-key` }
};

export const fetchUserData = async () => {
    try {
        const response = await axios.get(`${API_URL}/users`, config);
        return response.data;
    } catch (error) {
        console.error('Error fetching user data:', error);
        throw error;
    }
};

export const fetchWeeklyStats = async () => {
    try {
        const response = await axios.get(`${API_URL}/weekly-stats`);
        return response.data;
    } catch (error) {
        console.error('Error fetching weekly stats:', error);
        throw error;
    }
};
