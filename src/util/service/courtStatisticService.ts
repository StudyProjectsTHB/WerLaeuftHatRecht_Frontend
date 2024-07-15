import {Group, StatisticDurationDTO, UserDTO} from "../api/config/dto";
import {getCurrentPlace} from "./overviewStatisticService";
import {getOwnCurrentPlace, getOwnStatistic} from "./ownStatisticService";
import {createGroupUserStatistic} from "../api/statisticsApi";
import {getCompetitionData} from "./competitionService";

export const getOwnCourtCurrentPlace = async (token: string, user: UserDTO): Promise<[number, number]> => {
    return await getCurrentPlace(token, user);
}

export const getCourtOwnStatistic = async (token: string, user: UserDTO): Promise<[number[], string[], string[]]> => {
    return await getOwnStatistic(token, user);
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