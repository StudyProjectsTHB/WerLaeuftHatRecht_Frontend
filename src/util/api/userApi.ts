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

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(request),
        });

        if ( !response.ok ) {
            if ( response.status === 401 ) {
                throw new Error('Invalid credentials');
            } else {
                throw new Error('Login failed');
            }
        }


        return await response.json();

    } catch (error) {
        throw new Error('Login failed');
    }


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
            throw new Error('Token not found');
        } else if (response.status === 401) {
            throw new Error('Token expired');
        } else if (response.status === 400) {
            throw new Error('Password mismatch');
        } else {
            throw new Error('Registration failed');
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
        throw new Error('User creation failed');
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
        throw new Error('Failed to fetch users');
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
        throw new Error('Failed to fetch own user');
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
        throw new Error('Failed to delete user');
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
            throw new Error('User not found');
        } else if (response.status === 400) {
            throw new Error('Invalid update data');
        } else {
            throw new Error('Failed to update user');
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
        throw new Error('Failed to start password reset');
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
            throw new Error('Token not found');
        } else if (response.status === 401) {
            throw new Error('Token expired');
        } else if (response.status === 400) {
            throw new Error('Password mismatch');
        } else {
            throw new Error('Failed to reset password');
        }
    }
};
