import {API_BASE_URL} from "./config/config";

import {UserChallengeDTO} from "./config/dto";
import {getCurrentDate} from "../service/util";

// Definieren Sie das Interface für UserChallengeDTO

// Funktion, um das aktuelle Datum im Format YYYY-MM-DD zu erhalten


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

export const getFinishedChallenges = async (token: string): Promise<UserChallengeDTO[]> => {
    const url = `${API_BASE_URL}/challenges/successfully`;

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
}
