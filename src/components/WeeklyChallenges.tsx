import React from 'react';
import {UserChallengeDTO} from "../util/api/config/dto";

const WeeklyChallenges: React.FC<{ weeklyChallenges: UserChallengeDTO[] }> = ({weeklyChallenges}) => {
    let challengeList = [];
    for (let i = 0; i < weeklyChallenges.length; i++) {
        challengeList.push(
            <div className={"challenge"} key={i}>
                <div>
                    <p>{weeklyChallenges[i].challengeString}</p>
                    <p className={"counter"}>{weeklyChallenges[i].progressString}</p>
                </div>
                <p className={"status"}>{weeklyChallenges[i].completed ? "Fertig" : "Aktiv"}</p>
            </div>
        );

    }
    return (
        <div className="weekly-challenges">
            <h2>Wöchentliche Herausforderungen</h2>
            {challengeList}
        </div>

    );
};

export default WeeklyChallenges;
