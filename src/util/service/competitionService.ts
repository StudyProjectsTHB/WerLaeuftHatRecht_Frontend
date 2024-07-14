import {Competition} from "../api/config/dto";
import {getCompetition} from "../api/competitionApi";

export const getCompetitionData = async (token: string): Promise<[string, string]> => {
    const response = await getCompetition(token);

    return [response.startDate, response.endDate];
}