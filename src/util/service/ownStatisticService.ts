import {StatisticDurationDTO, UserChallengeDTO, UserDTO} from "../api/config/dto";
import {createUserStatistic} from "../api/statisticsApi";
import {getCompetitionData} from "./competitionService";
import {getCurrentPlace, getWeeklyChallenges} from "./overviewStatisticService";
import {getCalendarWeeksBetweenDates, getCurrentDate} from "./util";
import {getFinishedChallenges} from "../api/challengeApi";

export const totalStepsAndKilometers = async (token: string, user: UserDTO): Promise<[number, string]> => {
    const competition = await getCompetitionData(token);
    const startDate = competition[0];
    const endDate = competition[1];

    const statisticDuration: StatisticDurationDTO = {
        startDate: startDate,
        endDate: endDate
    };

    const response = await createUserStatistic(token, user.id, statisticDuration);

    return [response.steps, response.kilometers.toFixed(1)]
}

export const getOwnCurrentPlace = async (token: string, user: UserDTO): Promise<[number, number]> => {
    return await getCurrentPlace(token, user);
}

export const getFinishedWeeklyChallenges = async (token: string): Promise<UserChallengeDTO[]> => {
    return await getFinishedChallenges(token);
}

export const getOwnStatistic = async (token: string, user: UserDTO): Promise<[number[], string[], string[]]> => {
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
        const res = await createUserStatistic(token, user.id, request);
        const week = new Date(response[i].startOfWeek).toLocaleDateString() + " - " + new Date(response[i].endOfWeek).toLocaleDateString()
        weeklySteps.push(res.steps)
        weeks.push(week)
    }
    return [weeklySteps, response.map((week) =>"KW " + week.weekNumber), weeks]
}
