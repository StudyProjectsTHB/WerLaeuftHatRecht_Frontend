import {getAllGroups} from "./groupService";
import {Group, StatisticDurationDTO, UserStepsDTO} from "../api/config/dto";
import {getCourtStatistic} from "./courtStatisticService";
import {getCompetitionData} from "./competitionService";
import {createGroupUserStatistic} from "../api/statisticsApi";
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

export const getAllStatisticGroups = async (token: string): Promise<[number[], string[], number[]]> => {
    const response = await getCourtsStatistic(token);

    return response;
}