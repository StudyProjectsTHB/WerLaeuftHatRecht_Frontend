import {Group, StatisticDurationDTO} from "../api/config/dto";
import {getCompetition} from "../api/competitionApi";
import {createGroupStatistic, createGroupStatistics} from "../api/statisticsApi";
import {getCompetitionData} from "./competitionService";
import {getCalendarWeeksBetweenDates, getCurrentDate} from "./util";


export const getCourtCurrentPlace = async (token: string, group: Group): Promise<[number, number]> => {
    const competition = await getCompetition(token);

    const statisticDuration: StatisticDurationDTO = {
        startDate: competition.startDate,
        endDate: competition.endDate,
    };

    const response = await createGroupStatistics(token, statisticDuration);

    return [response.findIndex((groupStep => groupStep.group.id === group.id)) + 1, response.length];
}

export const getCourtsStatistic = async (token: string): Promise<[number[], string[], number[], number[]]> => {
    const competition = await getCompetition(token);
    const statisticDuration: StatisticDurationDTO = {
        startDate: competition.startDate,
        endDate: competition.endDate,
    };

    const response = await createGroupStatistics(token, statisticDuration);

    const groupStepsPerUser = response.map(groupStep => Math.round(groupStep.stepsPerUser));
    const groupNames = response.map(groupStep => groupStep.group.name);
    const groupIds = response.map(groupStep => groupStep.group.id);
    const groupSteps = response.map(groupStep => groupStep.steps);

    return [groupStepsPerUser, groupNames, groupIds, groupSteps];
}

export const getOwnCourtStatistic = async (token: string, group: Group): Promise<[number[], string[], string[]]> => {
    const competition = await getCompetitionData(token);
    const today = getCurrentDate();
    const endDate = today < competition[1] ? today : competition[1];
    const response = getCalendarWeeksBetweenDates(competition[0], endDate);

    const weeklySteps = []
    const weeks = []
    for (let i = 0; i < response.length; i++) {
        const request: StatisticDurationDTO = {
            startDate: response[i].startOfWeek,
            endDate: response[i].endOfWeek
        };
        const res = await createGroupStatistic(token, group.id, request);
        const week = new Date(response[i].startOfWeek).toLocaleDateString() + " - " + new Date(response[i].endOfWeek).toLocaleDateString()
        weeklySteps.push(Math.round(res.stepsPerUser))
        weeks.push(week)
    }
    return [weeklySteps, response.map((week) =>"KW " + week.weekNumber), weeks]
}
