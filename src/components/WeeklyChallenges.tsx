import React from 'react';

const WeeklyChallenges: React.FC = () => {
    return (
        <div className="weekly-challenges">
            <h2>Wöchentliche Herausforderungen</h2>
            <div className={"challenge"}>
                <div>
                    <p>Laufe an 2 aufeinanderfolgenden Tagen 15.000 Schritte</p>
                    <p className={"counter"}>1/2 Tage</p>
                </div>
                <p className={"status"}>Aktiv</p>
            </div>
        </div>
);
};

export default WeeklyChallenges;
