// Definieren Sie die Interfaces für die verschiedenen DTOs
import {API_BASE_URL} from "./config/config";
import {GroupStepsDTO, SingleUserStepsDTO, StatisticDurationDTO, UserStepsDTO} from "./config/dto";

// Funktion zum Erstellen einer Einzelbenutzerstatistik
export const createUserStatistic = async (token: string | null, id: number, statisticDuration: StatisticDurationDTO): Promise<SingleUserStepsDTO> => {
    const url = `${API_BASE_URL}/statistics/users/${id}`;

    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(statisticDuration),
    });

    if (!response.ok) {
        if (response.status === 404) {
            throw new Error('User not found');
        } else {
            throw new Error('An error occurred while fetching user statistic');
        }
    }

    return await response.json();
};

// Funktion zum Erstellen von Benutzerstatistiken
export const createUserStatistics = async (token: string, statisticDuration: StatisticDurationDTO): Promise<UserStepsDTO[]> => {
    const url = `${API_BASE_URL}/statistics/users`;

    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(statisticDuration),
    });

    if (!response.ok) {
        throw new Error('An error occurred while fetching user statistics');
    }

    return await response.json();
};

// Funktion zum Erstellen einer Gruppenstatistik
export const createGroupStatistic = async (token: string, id: number, statisticDuration: StatisticDurationDTO): Promise<GroupStepsDTO> => {
    const url = `${API_BASE_URL}/statistics/groups/${id}`;

    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(statisticDuration),
    });

    if (!response.ok) {
        if (response.status === 404) {
            throw new Error('Group not found');
        } else {
            throw new Error('An error occurred while fetching group statistic');
        }
    }

    return await response.json();
};

// Funktion zum Erstellen von Gruppenbenutzerstatistiken
export const createGroupUserStatistic = async (token: string, id: number, statisticDuration: StatisticDurationDTO): Promise<UserStepsDTO[]> => {
    const url = `${API_BASE_URL}/statistics/groups/${id}/users`;

    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(statisticDuration),
    });

    if (!response.ok) {
        if (response.status === 404) {
            throw new Error('Group not found');
        } else {
            throw new Error('An error occurred while fetching group user statistics');
        }
    }

    return await response.json();
};

// Funktion zum Erstellen von Gruppenstatistiken
export const createGroupStatistics = async (token: string, statisticDuration: StatisticDurationDTO): Promise<GroupStepsDTO[]> => {
    const url = `${API_BASE_URL}/statistics/groups`;

    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(statisticDuration),
    });

    if (!response.ok) {
        throw new Error('An error occurred while fetching group statistics');
    }

    return await response.json();
};
