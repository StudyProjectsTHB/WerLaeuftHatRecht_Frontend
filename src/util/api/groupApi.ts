import {API_BASE_URL} from "./config/config";
import {Group, GroupCreationDTO} from "./config/dto";


export const createGroups = async (token: string, groupCreations: GroupCreationDTO[]): Promise<Group[]> => {
    const url = `${API_BASE_URL}/groups`;

    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(groupCreations),
    });

    if (!response.ok) {
        if (response.status === 401) {
            throw new Error('Nicht autorisierter Zugriff');
        } else {
            throw new Error('Gruppe konnte nicht erstellt werden');
        }
    }

    return await response.json();
};

export const deleteGroup = async (token: string, id: number): Promise<void> => {
    const url = `${API_BASE_URL}/groups/${id}`;

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
        } else {
            throw new Error('Gruppe konnte nicht gelöscht werden');
        }
    }
};

export const updateGroup = async (token: string, id: number, groupCreation: GroupCreationDTO): Promise<Group> => {
    const url = `${API_BASE_URL}/groups/${id}`;

    const response = await fetch(url, {
        method: 'PUT',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(groupCreation),
    });

    if (!response.ok) {
        if (response.status === 404) {
            throw new Error('Gruppe nicht gefunden');
        } else if (response.status === 401) {
            throw new Error('Nicht autorisierter Zugriff');
        } else {
            throw new Error('Gruppe konnte nicht aktualisiert werden');
        }
    }

    return await response.json();
};

export const getGroup = async (token: string, id: number): Promise<Group> => {
    const url = `${API_BASE_URL}/groups/${id}`;

    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
    });

    if (!response.ok) {
        if (response.status === 404) {
            throw new Error('Gruppe nicht gefunden');
        } else if (response.status === 401) {
            throw new Error('Nicht autorisierter Zugriff');
        } else {
            throw new Error('Gruppe konnte nicht abgerufen werden');
        }
    }

    return await response.json();
};

export const getGroups = async (token: string): Promise<Group[]> => {
    const url = `${API_BASE_URL}/groups`;

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
            throw new Error('Gruppen konnten nicht abgerufen werden');
        }
    }

    return await response.json();
};
