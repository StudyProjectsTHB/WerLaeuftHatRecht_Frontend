import {API_BASE_URL} from "./config/config";

import {UserChallengeDTO} from "./config/dto";

// Definieren Sie das Interface für UserChallengeDTO

// Funktion, um das aktuelle Datum im Format YYYY-MM-DD zu erhalten
const getCurrentDate = (): string => {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
};

// Funktion, um die Herausforderungen vom Server zu holen
export const getChallenges = async (token: string, date: string = getCurrentDate()): Promise<UserChallengeDTO[]> => {
    const url = `${API_BASE_URL}/challenges/${date}`;

    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
    });

    if (!response.ok) {
        if (response.status === 401) {
            // Unauthorised error handling
            throw new Error('Unauthorized');
        } else {
            throw new Error('An error occurred while fetching challenges');
        }
    }

    return await response.json();
};
