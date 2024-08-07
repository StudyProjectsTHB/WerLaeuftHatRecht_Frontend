import {API_BASE_URL} from "./config/config";
import {WeatherResponseDTO} from "./config/dto";

export const getWeather = async (token: string): Promise<WeatherResponseDTO> => {
    const url = `${API_BASE_URL}/weather`;

    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
    });

    if (!response.ok) {
        if (response.status === 401) {
            throw new Error('Nicht autorisierter Zugriff');
        } else {
            throw new Error('Failed to fetch weather data');
        }
    }

    return await response.json();
};
