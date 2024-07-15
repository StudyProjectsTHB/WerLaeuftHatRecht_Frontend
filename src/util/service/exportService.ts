import {getAllStatisticAllUsers, getAllStatisticGroups, getAllStatisticGroupUsers} from "./statisticsService";

export const exportCourtUsers = async (token: string, groupId:number): Promise<[number[], string[], number[]]> => {
    return await getAllStatisticGroupUsers(token, groupId);
}

export const exportAllCourtsUsers = async (token: string): Promise<[number[], string[], number[]]> => {
    return getAllStatisticAllUsers(token);
}

export const exportAllCourts = async (token: string): Promise<[number[], string[], number[], number[]]> => {
    return await getAllStatisticGroups(token);
}