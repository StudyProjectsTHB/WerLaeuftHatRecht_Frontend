import {StatisticDurationDTO, UserChallengeDTO, UserDTO, WeatherResponseDTO} from '../api/config/dto';
import {createGroupUserStatistic, createUserStatistic} from "../api/statisticsApi";
import {getCompetition} from "../api/competitionApi";
import {getDays} from "../api/dayApi";
import {getChallenges} from "../api/challengeApi";
import {getWeather} from "../api/weatherApi";
import {formatDate, getCurrentDate} from "./util";


export const todaysSteps = async (token: string, user: UserDTO): Promise<number> => {
    const statisticDuration: StatisticDurationDTO = {
        startDate: getCurrentDate(),
        endDate: getCurrentDate(),
    };

    const response = await createUserStatistic(token, user.id, statisticDuration);

    return response.steps;

}

export const weeklyStepsAndKilometers = async (token: string, user: UserDTO): Promise<[number, string]> => {
    const today = new Date();
    const lastWeek = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
    const request: StatisticDurationDTO = {
        startDate: formatDate(lastWeek),
        endDate: getCurrentDate(),
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

export const getWeeklyChartSteps = async (token: string, user: UserDTO): Promise<[number[], string[], string[]]> => {
    const response = await getDays(token);

    const today = new Date();
    const lastWeekData = [];

    const daysOfWeekShort = ['So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa'];
    const daysOfWeekLong = ['Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag'];

    for (let i = 0; i < 7; i++) {
        const date = new Date(today);
        date.setDate(today.getDate() - i);
        const dateString = formatDate(date);
        const dayOfWeekShort = daysOfWeekShort[date.getDay()];
        const dayOfWeekLong = daysOfWeekLong[date.getDay()];

        const dayData = response.find(d => d.date === dateString);
        if (dayData) {
            lastWeekData.push({ ...dayData, dayOfWeekShort: dayOfWeekShort, dayOfWeekLong: dayOfWeekLong });
        } else {
            lastWeekData.push({ kilometers: 0, date: dateString, steps: 0, dayOfWeekShort: dayOfWeekShort, dayOfWeekLong: dayOfWeekLong });
        }
    }
    const steps = lastWeekData.map(d => d.steps);
    const labels = lastWeekData.map(d => d.dayOfWeekShort);
    const descriptions = lastWeekData.map(d => d.dayOfWeekLong);


    return [steps.reverse(), labels.reverse(), descriptions.reverse()];
}



export const getWeeklyChallenges = async (token: string, date?: string): Promise<UserChallengeDTO[]> => {
    const challenges = await getChallenges(token, date);

    return challenges.sort((a, b) => a.challengeString.localeCompare(b.challengeString));
}


export const getCurrentWeather = async (token: string): Promise<WeatherResponseDTO> => {
    return await getWeather(token);
}

