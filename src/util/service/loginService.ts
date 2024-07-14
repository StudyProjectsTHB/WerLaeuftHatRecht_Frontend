import {jwtDecode} from 'jwt-decode';
import {login, registerUserPassword} from "../api/userApi";
import {AuthenticationRequestDTO, AuthenticationResponseDTO, UserDTO, UserPasswordsDTO} from "../api/config/dto";
import {useHistory} from "react-router";
import {useState} from "react";

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

export const getUser = (): UserDTO | null => {
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

    console.log(userPasswords);

    const response = await registerUserPassword(userPasswords, token);

    return response;
}

export const loginUser = async (email: string, password: string): Promise<void> => {

    const request: AuthenticationRequestDTO = {
        email: email,
        password: password
    };

    const response: AuthenticationResponseDTO = await login(request);
    // console.log('Response:', response);
    setToken(response.accessToken);
    setUser(JSON.stringify(response.user));
    // localStorage.setItem('user', JSON.stringify(response.user));
    // history.push('/tabs/tab1');
}

export const logout = (): void => {
    removeToken();
    removeUser();
};

