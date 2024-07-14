// Definieren Sie die Interfaces für DayDTO, StepsDTO und DurationStepsDTO
import {API_BASE_URL} from "./config/config";

import {DayDTO, DurationStepsDTO, StepsDTO} from "./config/dto";

// Funktion zum Löschen eines Tages
export const deleteDay = async (token: string, date: string): Promise<void> => {
    const url = `${API_BASE_URL}/days/${date}`;

    const response = await fetch(url, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
    });

    if (!response.ok) {
        if (response.status === 401) {
            throw new Error('Unauthorized');
        } else if (response.status === 409) {
            throw new Error('Competition Not Started');
        } else {
            throw new Error('An error occurred while deleting the day');
        }
    }
};

// Funktion zum Aktualisieren eines Tages
export const updateDay = async (token: string, date: string, daySteps: StepsDTO): Promise<DayDTO> => {
    const url = `${API_BASE_URL}/days/${date}`;

    const response = await fetch(url, {
        method: 'PUT',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(daySteps),
    });

    if (!response.ok) {
        if (response.status === 401) {
            throw new Error('Unauthorized');
        } else if (response.status === 409) {
            throw new Error('Competition Not Started');
        } else {
            throw new Error('An error occurred while updating the day');
        }
    }

    return await response.json();
};

// Funktion zum Hinzufügen von Tagen
export const addDays = async (token: string, durationSteps: DurationStepsDTO): Promise<DayDTO[]> => {
    const url = `${API_BASE_URL}/days`;

    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(durationSteps),
    });

    if (!response.ok) {
        if (response.status === 401) {
            throw new Error('Unauthorized');
        } else if (response.status === 400) {
            throw new Error('Bad Request');
        } else if (response.status === 409) {
            throw new Error('Competition Not Started or Days Not in Competition');
        } else {
            throw new Error('An error occurred while adding the days');
        }
    }

    return await response.json();
};

// Funktion zum Abrufen der Tage
export const getDays = async (token: string): Promise<DayDTO[]> => {
    const url = `${API_BASE_URL}/days`;

    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
    });

    if (!response.ok) {
        if (response.status === 401) {
            throw new Error('Unauthorized');
        } else {
            throw new Error('An error occurred while fetching the days');
        }
    }

    return await response.json();
};
