import React from 'react';
import WeeklyChallenges from "./WeeklyChallenges";

const FinishedChallenges: React.FC = () => {
    return (
        <div className="weekly-challenges">
            <h2>Abgeschlossene Herausforderungen</h2>
            <div className={"challenge"}>
                <div>
                    <p>Laufe an 3 aufeinanderfolgenden Tagen 20.000 Schritte</p>
                    <p className={"counter"}>2/2 Tage</p>
                </div>
                <p className={"status"}>Fertig</p>
            </div>
            <div className={"challenge"}>
                <div>
                    <p>Laufe an 3 aufeinanderfolgenden Tagen 20.000 Schritte</p>
                    <p className={"counter"}>2/2 Tage</p>
                </div>
                <p className={"status"}>Fertig</p>
            </div>
        </div>
    );
}

export default FinishedChallenges;
