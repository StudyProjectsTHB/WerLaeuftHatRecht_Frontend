import {DayDTO, DurationStepsDTO} from "../api/config/dto";
import {addDays, deleteDays, getDays} from "../api/dayApi";
import {getCompetition} from "../api/competitionApi";
import {formatDate, getCurrentDate} from "./util";

const generateDateRange = async (startDate: string, endDate: string): Promise<string[]> => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const dateArray: string[] = [];

    for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
        dateArray.push(formatDate(new Date(d)));
    }

    return dateArray;
}


export const getStepDays = async (token: string): Promise<DayDTO[]> => {

    const competition = await getCompetition(token);
    const today = getCurrentDate();

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

export const addSteps = async (token: string, steps: number, startDate: string, endDate: string): Promise<DayDTO[]> => {
    const competition = await getCompetition(token);
    const today = getCurrentDate()
    const durationSteps: DurationStepsDTO = {
        steps,
        startDate,
        endDate
    };

    if (steps <= 0 || isNaN(steps)) {
        throw new Error('Bitte gib eine Schrittzahl größer 0 an');
    } else if (startDate > endDate) {
        throw new Error('Das Startdatum muss vor dem Enddatum liegen');
    } else if (endDate > today) {
        throw new Error('Das Enddatum darf nicht in der Zukunft liegen');
    } else if (startDate < competition.startDate) {
        throw new Error('Das Startdatum darf nicht vor dem Wettbewerbsstart liegen');
    } else if (endDate > competition.endDate) {
        throw new Error('Das Enddatum darf nicht nach dem Wettbewerbsende liegen');
    }


    return await addDays(token, durationSteps);
}

export const deleteSteps = async (token: string, startDate: string, endDate: string): Promise<boolean> => {
    return deleteDays(token, startDate, endDate);
}