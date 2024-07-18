import {API_BASE_URL} from "./config/config";

import {DayDTO, DurationStepsDTO, StepsDTO} from "./config/dto";

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
            throw new Error('Nicht autorisierter Zugriff');
        } else if (response.status === 409) {
            throw new Error('Wettbewerb nicht gestartet');
        } else {
            throw new Error('Tag konnte nicht gelöscht werden');
        }
    }
};

export const deleteDays = async (token: string, startDate: string, endDate: string): Promise<boolean> => {
    const url = `${API_BASE_URL}/days?startDate=${startDate}&endDate=${endDate}`;

    const response = await fetch(url, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
    });

    if (!response.ok) {
        if (response.status === 401) {
            throw new Error('Nicht autorisierter Zugriff');
        } else if (response.status === 409) {
            throw new Error('Wettbewerb nicht gestartet');
        } else {
            throw new Error('Tage konnten nicht gelöscht werden');
        }
    }

    return true;

}

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
            throw new Error('Nicht autorisierter Zugriff');
        } else if (response.status === 409) {
            throw new Error('Wettbewerb nicht gestartet');
        } else {
            throw new Error('Tag konnte nicht aktualisiert werden');
        }
    }

    return await response.json();
};

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
            throw new Error('Nicht autorisierter Zugriff');
        } else if (response.status === 400) {
            throw new Error('Ungültige Anfrage');
        } else if (response.status === 409) {
            throw new Error('Tage nicht im Wettbewerbszeitraum');
        } else {
            throw new Error('Tage konnten nicht hinzugefügt werden');
        }
    }

    return await response.json();
};

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
            throw new Error('Nicht autorisierter Zugriff');
        } else {
            throw new Error('Tage konnten nicht abgerufen werden');
        }
    }

    return await response.json();
};
