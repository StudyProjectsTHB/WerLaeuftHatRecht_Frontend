import {Competition, UpdateCompetitionDTO} from "../api/config/dto";
import {getCompetition, updateCompetition} from "../api/competitionApi";

export const getCompetitionData = async (token: string): Promise<[string, string]> => {
    const response = await getCompetition(token);

    return [response.startDate, response.endDate];
}

export const changeCompetition = async (token: string, startDate: string, endDate: string): Promise<Competition> => {

    const updateCompetitionDTO:UpdateCompetitionDTO = {
        startDate: startDate,
        endDate: endDate,
        onlyUpdate: true,
    }

    const response = await updateCompetition(token, updateCompetitionDTO);

    return response;
}