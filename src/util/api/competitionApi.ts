import {API_BASE_URL} from "./config/config";

import {Competition, UpdateCompetitionDTO} from "./config/dto";

export const getCompetition = async (token: string): Promise<Competition> => {
        const url = `${API_BASE_URL}/competition`;

        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            if (response.status === 404) {
                throw new Error('Wettbewerb nicht gefunden');
            } else if (response.status === 401) {
                throw new Error('Nicht autorisierter Zugriff');
            } else {
                throw new Error('Wettbewerb konnte nicht abgerufen werden');
            }
        }

        return await response.json();
    }
;

export const updateCompetition = async (token: string, updateCompetition: UpdateCompetitionDTO): Promise<Competition> => {
    const url = `${API_BASE_URL}/competition`;

    const response = await fetch(url, {
        method: 'PUT',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(updateCompetition),
    });

    if (!response.ok) {
        if (response.status === 404) {
            throw new Error('Wettbewerb nicht gefunden');
        } else if (response.status === 401) {
            throw new Error('Nicht autorisierter Zugriff');
        } else {
            throw new Error('Wettbewerb konnte nicht aktualisiert werden');
        }
    }

    return await response.json();
};
