import {jwtDecode} from 'jwt-decode';
import {getOwnUser, login, registerUserPassword} from "../api/userApi";
import {AuthenticationRequestDTO, AuthenticationResponseDTO, UserDTO, UserPasswordsDTO} from "../api/config/dto";

export const setToken = (token: string): void => {
    localStorage.setItem('authToken', token);
};

export const getToken = (): string | null => {
    return localStorage.getItem('authToken');
};

const removeToken = (): void => {
    localStorage.removeItem('authToken');
};

const setUser = (user: string): void => {
    localStorage.setItem('user', user);
}

export const getUser = (token:string): UserDTO | null => {
    const user = getOwnUser(token);
    user.then((response) => {
        localStorage.setItem('user', JSON.stringify(response));
    });
    return JSON.parse(localStorage.getItem('user') || '{}');
}

export const removeUser = (): void => {
    localStorage.removeItem('user');
}

const isTokenExpired = (token: string): boolean => {
    const decodedToken = jwtDecode(token);
    const expirationTimeInSeconds = decodedToken.exp;

    if (!expirationTimeInSeconds) {
        return true;
    }

    const currentDateTime = new Date().getTime() / 1000;

    return expirationTimeInSeconds < currentDateTime;
}

export const checkToken = (): boolean => {
    const token = getToken();

    if (!token) {
        removeToken();
        return false;
    }

    if (isTokenExpired(token)) {
        removeToken();
        return false;
    }

    return true;
}

export const registerUser = async (token: string, password: string, passwordConfirm:string): Promise<UserDTO> => {
    const userPasswords: UserPasswordsDTO = {
        password: password,
        passwordConfirm: passwordConfirm
    };

    return await registerUserPassword(userPasswords, token);
}

export const loginUser = async (email: string, password: string): Promise<void> => {

    const request: AuthenticationRequestDTO = {
        email: email,
        password: password
    };

    const response: AuthenticationResponseDTO = await login(request);
    setToken(response.accessToken);
    setUser(JSON.stringify(response.user));
}

export const logoutUser = (): void => {
    removeToken();
    removeUser();
    localStorage.clear();
};

