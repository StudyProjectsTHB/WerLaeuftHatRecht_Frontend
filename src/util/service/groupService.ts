import {Group, GroupCreationDTO} from "../api/config/dto";
import {createGroups, deleteGroup, getGroups, updateGroup} from "../api/groupApi";

export const getAllGroups = async (token: string): Promise<Group[]> => {
    return await getGroups(token);
}

export const changeGroup = async (token: string, groupId:number, groupName: string, numberOfEmployees:number): Promise<Group> => {
    const group: GroupCreationDTO = {
        name: groupName,
        numberOfEmployees: numberOfEmployees
    }
    return await updateGroup(token, groupId, group);
}

export const addGroup = async (token: string, groupName: string, numberOfEmployees:number): Promise<Group[]> => {
    const group: GroupCreationDTO = {
        name: groupName,
        numberOfEmployees: numberOfEmployees
    }
    return await createGroups(token, [group]);
}

export const removeGroup = async (token: string, groupId: number): Promise<boolean> => {
    try {
        await deleteGroup(token, groupId);
        return true;
    } catch (e) {
        console.log(e);
        return false;
    }
}