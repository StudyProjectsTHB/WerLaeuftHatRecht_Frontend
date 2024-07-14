// Definieren Sie die Interfaces für Group und GroupCreationDTO
import {API_BASE_URL} from "./config/config";
import {Group, GroupCreationDTO} from "./config/dto";


// Funktion zum Erstellen von Gruppen
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
        throw new Error('An error occurred while creating groups');
    }

    return await response.json();
};

// Funktion zum Löschen einer Gruppe
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
        throw new Error('An error occurred while deleting the group');
    }
};

// Funktion zum Aktualisieren einer Gruppe
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
            throw new Error('Group not found');
        } else {
            throw new Error('An error occurred while updating the group');
        }
    }

    return await response.json();
};

// Funktion zum Abrufen einer Gruppe
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
            throw new Error('Group not found');
        } else {
            throw new Error('An error occurred while fetching the group');
        }
    }

    return await response.json();
};

// Funktion zum Abrufen aller Gruppen
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
        throw new Error('An error occurred while fetching groups');
    }

    return await response.json();
};
