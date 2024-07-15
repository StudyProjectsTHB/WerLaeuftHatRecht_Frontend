import React from 'react';
import WeeklyChallenges from "./WeeklyChallenges";
import {UserChallengeDTO} from "../util/api/config/dto";

const FinishedChallenges: React.FC<{finishedChallenges: UserChallengeDTO[]}> = ({finishedChallenges}) => {
    let challengeList = [];
    for (let i = 0; i < finishedChallenges.length; i++) {
        challengeList.push(
            <div className={"challenge"} key={i}>
                <div>
                    <p>{finishedChallenges[i].challengeString}</p>
                    <p className={"counter"}>{finishedChallenges[i].progressString}</p>
                </div>
                <p className={"status"}>{finishedChallenges[i].completed ? "Fertig" : "Aktiv"}</p>
            </div>
        );
    }
    if (challengeList.length === 0) {
        challengeList.push(
            <div className={"challenge"} key={0}>
                <div>
                    <p>{"Sieht so aus als hättest noch keine Herausforderungen absolviert. :("}</p>
                    <p className={"counter"}>{"Schau doch mal bei den aktuellen Herausforderungen vorbei!"}</p>
                </div>
                <p className={"status"}>{"Aktiv"}</p>
            </div>
        );

    }


    return (
        <div className="weekly-challenges done">
            <h2>Absolvierte Herausforderungen</h2>
            {challengeList}
        </div>

    );
}

export default FinishedChallenges;
