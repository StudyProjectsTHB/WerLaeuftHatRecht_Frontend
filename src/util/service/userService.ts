import {Group, UpdateUserDTO, UserCreationDTO, UserDTO, UserTokenDTO} from "../api/config/dto";
import {createUsers, deleteUser, getUsers, updateUser} from "../api/userApi";
import {getAllGroups} from "./groupService";


export const getAllUsers = async (token: string): Promise<UserDTO[]> => {
    return await getUsers(token);
}

export const getAllCourts = async (token: string): Promise<Group[]> => {
    return await getAllGroups(token);
}

export const createUser = async (token: string, email: string, isAdmin: boolean, groupId: number): Promise<UserTokenDTO[]> => {
    const user:UserCreationDTO = {
        email: email,
        isAdmin: isAdmin,
        groupId: groupId
    }
    return await createUsers(token, [user]);
}

export const removeUser = async (token: string, id: number): Promise<boolean> => {
    await deleteUser(token, id);
    return true;
}

export const changeUserGroup = async (token: string, id: number, groupId: number): Promise<UserDTO> => {
    const user: UpdateUserDTO = {
        groupId: groupId
    }
    return await updateUser(token, id, user);
}


export const changeUserEmail = async (token: string, id: number, email: string): Promise<UserDTO> => {
    const user: UpdateUserDTO = {
        email: email
    }
    return await updateUser(token, id, user);
}

export const changeUserAdmin = async (token: string, id: number, isAdmin: boolean): Promise<UserDTO> => {
    const user: UpdateUserDTO = {
        isAdmin: isAdmin
    }
    return await updateUser(token, id, user);
}