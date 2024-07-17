import {Group, StatisticDurationDTO, UserDTO} from "../api/config/dto";
import {getCurrentPlace} from "./overviewStatisticService";
import {createGroupStatistic, createGroupUserStatistic} from "../api/statisticsApi";
import {getCompetitionData} from "./competitionService";
import {getCalendarWeeksBetweenDates, getCurrentDate} from "./util";

export const getOwnCourtCurrentPlace = async (token: string, user: UserDTO): Promise<[number, number]> => {
    return await getCurrentPlace(token, user);
}

export const getCourtOwnStatistic = async (token: string, group: Group): Promise<[number[], string[], string[]]> => {
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

export const getCourtStatistic = async (token: string, group: Group): Promise<[number[], string[], number[]]> => {

    const competition = await getCompetitionData(token);
    const startDate = competition[0];
    const endDate = competition[1];

    const statisticDuration: StatisticDurationDTO = {
        startDate: startDate,
        endDate: endDate
    }

    const response = await createGroupUserStatistic(token, group.id, statisticDuration);

    return [response.map((user) => user.steps), response.map((user) => `${user.adjective} ${user.noun}`), response.map((user) => user.id)];

}