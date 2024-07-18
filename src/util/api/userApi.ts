import {API_BASE_URL} from "./config/config";

import {
    AuthenticationRequestDTO,
    AuthenticationResponseDTO,
    EmailDTO,
    UpdateUserDTO,
    UserCreationDTO,
    UserDTO,
    UserPasswordsDTO,
    UserTokenDTO
} from "./config/dto";

export const login = async (request: AuthenticationRequestDTO): Promise<AuthenticationResponseDTO> => {
    const url = `${API_BASE_URL}/users/login`;

    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(request),
    });

    if (!response.ok) {
        if (response.status === 401) {
            throw new Error('Email oder Passwort ist falsch');
        } else {
            throw new Error('Login fehlgeschlagen');
        }
    }


    return await response.json();


};

export const registerUserPassword = async (userPasswords: UserPasswordsDTO, token: string): Promise<UserDTO> => {
    const url = `${API_BASE_URL}/users/register/${token}`;

    const response = await fetch(url, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userPasswords),
    });

    if (!response.ok) {
        if (response.status === 404) {
            throw new Error('Token wurde nicht gefunden');
        } else if (response.status === 401) {
            throw new Error('Token ist abgelaufen');
        } else if (response.status === 400) {
            throw new Error('Passwörter stimmen nicht überein');
        } else {
            throw new Error('Registrierung fehlgeschlagen');
        }
    }

    return await response.json();
};

export const createUsers = async (token: string, userCreations: UserCreationDTO[]): Promise<UserTokenDTO[]> => {
    const url = `${API_BASE_URL}/users`;

    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userCreations),
    });

    if (!response.ok) {
        if (response.status === 401) {
            throw new Error('Nicht autorisierter Zugriff');
        } else {
            throw new Error('Nutzer konnte nicht erstellt werden');
        }
    }

    return await response.json();
};

export const getUsers = async (token: string): Promise<UserDTO[]> => {
    const url = `${API_BASE_URL}/users`;

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
            throw new Error('Nutzer konnten nicht abgerufen werden');
        }
    }

    return await response.json();
};

export const getOwnUser = async (token: string): Promise<UserDTO> => {
    const url = `${API_BASE_URL}/users/self`;

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
            throw new Error('Eigener Nutzer konnte nicht abgerufen werden');
        }
    }

    return await response.json();
};

export const deleteUser = async (token: string, id: number): Promise<void> => {
    const url = `${API_BASE_URL}/users/${id}`;

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
            throw new Error('Nutzer konnte nicht gelöscht werden');
        }
    }
};

export const updateUser = async (token: string, id: number, updateUser: UpdateUserDTO): Promise<UserDTO> => {
    const url = `${API_BASE_URL}/users/${id}`;

    const response = await fetch(url, {
        method: 'PUT',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(updateUser),
    });


    if (!response.ok) {
        if (response.status === 404) {
            throw new Error('Nutzer nicht gefunden');
        } else if (response.status === 400) {
            throw new Error('Fehlerhafte Anfrage');
        } else if (response.status === 401) {
            throw new Error('Nicht autorisierter Zugriff');
        } else {
            throw new Error('Nutzer konnte nicht aktualisiert werden');
        }
    }

    return await response.json();
};

export const startPasswordReset = async (emailDTO: EmailDTO): Promise<void> => {
    const url = `${API_BASE_URL}/users/password/reset`;

    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(emailDTO),
    });

    if (!response.ok) {
        throw new Error('Fehler beim Zurücksetzen des Passworts');
    }
};

export const resetPassword = async (userPasswords: UserPasswordsDTO, token: string): Promise<void> => {
    const url = `${API_BASE_URL}/users/password/reset/${token}`;

    const response = await fetch(url, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userPasswords),
    });

    if (!response.ok) {
        if (response.status === 404) {
            throw new Error('Token nicht gefunden');
        } else if (response.status === 401) {
            throw new Error('Token abgelaufen');
        } else if (response.status === 400) {
            throw new Error('Passwörter stimmen nicht überein');
        } else {
            throw new Error('Fehler beim Zurücksetzen des Passworts');
        }
    }
};
