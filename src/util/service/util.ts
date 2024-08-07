import {eachWeekOfInterval, endOfWeek, format, startOfWeek} from 'date-fns';
import {getCompetitionData} from "./competitionService";

export const getCalendarWeeksBetweenDates = (startDate:string, endDate:string):{
    startOfWeek: string;
    endOfWeek: string;
    weekNumber: string
}[] => {
    const start = startOfWeek(new Date(startDate), { weekStartsOn: 1 }); // Woche beginnt am Montag
    const end = endOfWeek(new Date(endDate), { weekStartsOn: 1 });


    const weeks = eachWeekOfInterval({
        start,
        end,
    }, { weekStartsOn: 1});


    return weeks.map(week => ({
        startOfWeek: format(startOfWeek(week, {weekStartsOn: 1}), 'yyyy-MM-dd'),
        endOfWeek: format(endOfWeek(week, {weekStartsOn: 1}), 'yyyy-MM-dd'),
        weekNumber: format(week, 'w')
    }));
};


export const getLapsedDays = async (token: string): Promise<number> => {
    const competition = await getCompetitionData(token);
    const startDate = new Date(competition[0]);
    const today = new Date();
    const endDate = today < new Date(competition[1]) ? today : new Date(competition[1]);
    const diffTime = Math.abs(today.getTime() - startDate.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}

export const convertUmlauts = (text: string): string => {
    const umlautMap = {
        'ä': 'ae',
        'ö': 'oe',
        'ü': 'ue',
        'Ä': 'Ae',
        'Ö': 'Oe',
        'Ü': 'Ue',
        'ß': 'ss'
    };

    return text.split('').map(char => umlautMap[char] || char).join('');
}

export const getCurrentDate = (): string => {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
};

export function formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}