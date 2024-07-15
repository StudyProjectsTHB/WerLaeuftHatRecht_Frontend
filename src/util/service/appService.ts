import {getCompetition} from "../api/competitionApi";
import {getCurrentDate} from "./util";

export const getDaysRemaining = async (token: string): Promise<number> => {
    const millisecondsPerDay = 24 * 60 * 60 * 1000;
    const competition = await getCompetition(token);
    const today = new Date(getCurrentDate());
    const endDate = new Date(competition.endDate);
    return Math.round(Math.abs((endDate.getTime() - today.getTime()) / millisecondsPerDay));
}