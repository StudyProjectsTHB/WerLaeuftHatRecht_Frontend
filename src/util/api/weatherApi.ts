// Funktion zum Abrufen der Wetterdaten
import {API_BASE_URL} from "./config/config";

export const getWeather = async (token: string): Promise<Map<string, any>> => {
    const url = `${API_BASE_URL}/weather`;

    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
    });

    if (!response.ok) {
        throw new Error('Failed to fetch weather data');
    }

    return await response.json();
};
