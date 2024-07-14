import {StatisticDurationDTO, UserChallengeDTO, UserDTO} from '../api/config/dto';
import {createGroupUserStatistic, createUserStatistic} from "../api/statisticsApi";
import {getCompetition} from "../api/competitionApi";
import {getDays} from "../api/dayApi";
import {getChallenges} from "../api/challengeApi";


export const todaysSteps = async (token: string, user: UserDTO): Promise<number> => {
    const today = new Date();
    const statisticDuration: StatisticDurationDTO = {
        startDate: today.toISOString(),
        endDate: today.toISOString(),
    };

    const response = await createUserStatistic(token, user.id, statisticDuration);

    return response.steps;

}

export const weeklyStepsAndKilometers = async (token: string, user: UserDTO): Promise<[number, string]> => {
    const today = new Date();
    const lastWeek = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
    const request: StatisticDurationDTO = {
        startDate: lastWeek.toISOString(),
        endDate: today.toISOString(),
    };

    const response = await createUserStatistic(token, user.id, request);

    return [response.steps, response.kilometers.toFixed(1)]
}

export const getCurrentPlace = async (token: string, user: UserDTO): Promise<[number, number]> => {
    const competition = await getCompetition(token);

    const statisticDuration: StatisticDurationDTO = {
        startDate: competition.startDate,
        endDate: competition.endDate,
    };

    const response = await createGroupUserStatistic(token, user.group.id, statisticDuration);

    return [response.findIndex((userStep => userStep.id === user.id)) + 1, response.length];
}

export const getWeeklyChartSteps = async (token: string, user: UserDTO): Promise<[number[], string[]]> => {
    const response = await getDays(token);

    const today = new Date();
    const lastWeekData = [];

    const daysOfWeek = ['So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa'];

    for (let i = 0; i < 7; i++) {
        const date = new Date(today);
        date.setDate(today.getDate() - i);
        const dateString = date.toISOString().split('T')[0];
        const dayOfWeek = daysOfWeek[date.getDay()];

        const dayData = response.find(d => d.date === dateString);
        if (dayData) {
            lastWeekData.push({ ...dayData, dayOfWeek });
        } else {
            lastWeekData.push({ kilometers: 0, date: dateString, steps: 0, dayOfWeek });
        }
    }
    const steps = lastWeekData.map(d => d.steps);
    const labels = lastWeekData.map(d => d.dayOfWeek);

    return [steps.reverse(), labels.reverse()];
}



export const getWeeklyChallenges = async (token: string, date?: string): Promise<UserChallengeDTO[]> => {
    return await getChallenges(token, date);
}