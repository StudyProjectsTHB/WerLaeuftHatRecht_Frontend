import {getAllGroups} from "./groupService";
import {Group, StatisticDurationDTO} from "../api/config/dto";
import {getCompetitionData} from "./competitionService";
import {createGroupUserStatistic, createUserStatistics} from "../api/statisticsApi";
import {getCourtsStatistic} from "./allCourtsStatisticService";

export const getAllCourts = async (token: string): Promise<Group[]> => {
    return await getAllGroups(token);
}

export const getAllStatisticGroupUsers = async (token: string, groupId:number): Promise<[number[], string[], number[]]> => {

    const competition = await getCompetitionData(token);
    const startDate = competition[0];
    const endDate = competition[1];

    const statisticDuration: StatisticDurationDTO = {
        startDate: startDate,
        endDate: endDate
    }

    const response = await createGroupUserStatistic(token, groupId, statisticDuration);

    return [response.map((user) => user.steps), response.map((user) => `${user.adjective} ${user.noun}`), response.map((user) => user.id)];
}

export const getAllStatisticGroups = async (token: string): Promise<[number[], string[], number[], number[]]> => {
    return await getCourtsStatistic(token);
}

export const getAllStatisticAllUsers = async (token: string): Promise<[number[], string[], number[]]> => {
    const competition = await getCompetitionData(token);
    const startDate = competition[0];
    const endDate = competition[1];

    const statisticDuration: StatisticDurationDTO = {
        startDate: startDate,
        endDate: endDate
    }

    const response = await createUserStatistics(token, statisticDuration);

    return [response.map((user) => user.steps), response.map((user) => `${user.adjective} ${user.noun}`), response.map((user) => user.id)];
}