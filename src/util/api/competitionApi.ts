// Definieren Sie die Interfaces für Competition und UpdateCompetitionDTO
import {API_BASE_URL} from "./config/config";

import {Competition, UpdateCompetitionDTO} from "./config/dto";

// Funktion, um die Competition vom Server zu holen
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
            // Not Found error handling
            throw new Error('Not Found');
        } else {
            throw new Error('An error occurred while fetching competition');
        }
    }

    return await response.json();
};

// Funktion, um die Competition zu aktualisieren
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
            // Not Found error handling
            throw new Error('Not Found');
        } else {
            throw new Error('An error occurred while updating competition');
        }
    }

    return await response.json();
};
