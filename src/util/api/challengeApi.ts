import {API_BASE_URL} from "./config/config";

import {UserChallengeDTO} from "./config/dto";
import {getCurrentDate} from "../service/util";

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
            throw new Error('Nicht autorisierter Zugriff');
        } else {
            throw new Error('Herausforderungen konnten nicht abgerufen werden');
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
            throw new Error('Nicht autorisierter Zugriff');
        } else {
            throw new Error('Erfolgreich abgeschlossene Herausforderungen konnten nicht abgerufen werden');
        }
    }

    return await response.json();
}
