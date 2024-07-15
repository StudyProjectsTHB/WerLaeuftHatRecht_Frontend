import {DayDTO, DurationStepsDTO} from "../api/config/dto";
import {addDays, getDays} from "../api/dayApi";
import {getCompetition} from "../api/competitionApi";

const generateDateRange = async (startDate: string, endDate: string): Promise<string[]> => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const dateArray: string[] = [];

    for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
        dateArray.push(new Date(d).toISOString().split('T')[0]);
    }

    return dateArray;
}


export const getStepDays = async (token: string): Promise<DayDTO[]> => {

    const competition = await getCompetition(token);
    const today = new Date().toISOString().split('T')[0];

    const endDate = today < competition.endDate ? today : competition.endDate;

    const dateRange = await generateDateRange(competition.startDate, endDate);

    const response = await getDays(token);

    const dataMap = new Map(response.map(day => [day.date, day]));

    return dateRange.map(date => {
        if (dataMap.has(date)) {
            return dataMap.get(date)!;
        } else {
            return {kilometers: 0, date, steps: 0};
        }
    });
}

export const addSteps = async (token: string, steps: number, startDate:string, endDate:string): Promise<DayDTO[]> => {
    const competition = await getCompetition(token);
    const today = new Date().toISOString().split('T')[0];
    const durationSteps: DurationStepsDTO = {
        steps,
        startDate,
        endDate
    };

    if (startDate < competition.startDate || endDate > today || endDate > competition.endDate) {
        throw new Error('Invalid date range');
    }

    console.log(durationSteps);

    const response = await addDays(token, durationSteps);

    console.log(response);

    return response;
}