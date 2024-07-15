import {Group, StatisticDurationDTO, UserDTO} from "../api/config/dto";
import {getCompetition} from "../api/competitionApi";
import {createGroupStatistic, createGroupStatistics, createUserStatistic} from "../api/statisticsApi";
import {getCompetitionData} from "./competitionService";
import {getCalendarWeeksBetweenDates} from "./util";


export const getCourtCurrentPlace = async (token: string, group: Group): Promise<[number, number]> => {
    const competition = await getCompetition(token);

    const statisticDuration: StatisticDurationDTO = {
        startDate: competition.startDate,
        endDate: competition.endDate,
    };

    const response = await createGroupStatistics(token, statisticDuration);

    return [response.findIndex((groupStep => groupStep.group.id === group.id)) + 1, response.length];
}

export const getCourtsStatistic = async (token: string): Promise<[number[], string[], number[]]> => {
    const competition = await getCompetition(token);
    const statisticDuration: StatisticDurationDTO = {
        startDate: competition.startDate,
        endDate: competition.endDate,
    };

    const response = await createGroupStatistics(token, statisticDuration);

    const groupSteps = response.map(groupStep => Math.round(groupStep.stepsPerUser));
    const groupNames = response.map(groupStep => groupStep.group.name);
    const groupIds = response.map(groupStep => groupStep.group.id);

    return [groupSteps, groupNames, groupIds];
}

export const getOwnCourtStatistic = async (token: string, group: Group): Promise<[number[], string[]]> => {
    const competition = await getCompetitionData(token);
    const today = new Date().toISOString()
    const response = getCalendarWeeksBetweenDates(competition[0], today);

    const weeklySteps = []
    for (let i = 0; i < response.length; i++) {
        const request: StatisticDurationDTO = {
            startDate: response[i].startOfWeek,
            endDate: response[i].endOfWeek
        };
        const res = await createGroupStatistic(token, group.id, request);
        weeklySteps.push(res.stepsPerUser)
    }
    return [weeklySteps, response.map((week) =>"KW " + week.weekNumber)]
}
