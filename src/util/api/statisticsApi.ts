import {API_BASE_URL} from "./config/config";
import {GroupStepsDTO, SingleUserStepsDTO, StatisticDurationDTO, UserStepsDTO} from "./config/dto";

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
            throw new Error('Nutzer nicht gefunden');

        } else {
            throw new Error('Nutzerstatistik konnte nicht abgerufen werden');
        }
    }

    return await response.json();
};

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
        if (response.status === 401) {
            throw new Error('Nicht autorisierter Zugriff');
        } else {
            throw new Error('Nutzerstatistiken konnten nicht abgerufen werden');
        }
    }

    return await response.json();
};

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
            throw new Error('Gruppe nicht gefunden');
        } else if (response.status === 401) {
            throw new Error('Nicht autorisierter Zugriff');
        } else {
            throw new Error('Gruppenstatistik konnte nicht abgerufen werden');
        }
    }

    return await response.json();
};

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
            throw new Error('Gruppe nicht gefunden');
        } else if (response.status === 401) {
            throw new Error('Nicht autorisierter Zugriff');
        } else {
            throw new Error('Gruppenstatistiken konnten nicht abgerufen werden');
        }
    }

    return await response.json();
};

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
        if (response.status === 401) {
            throw new Error('Nicht autorisierter Zugriff');
        } else {
            throw new Error('Gruppenstatistiken konnten nicht abgerufen werden');
        }
    }

    return await response.json();
};
