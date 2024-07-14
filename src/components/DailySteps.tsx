import React from 'react';
import { IonButton } from '@ionic/react';
import {useHistory} from "react-router";

const DailySteps: React.FC<{steps:number}> = ({steps}) => {
    const history = useHistory();
    const handleButtonClick = () => {
        history.push("/tabs/tab2?showModal=true")
    }
    if (steps > 0) {
        return (
            <div className="daily-steps">
                <p>Hey, du bist heute schon {steps.toLocaleString('de-DE')} Schritte gelaufen!</p>
                <IonButton color={"secondary"} onClick={handleButtonClick}>Jetzt eintragen</IonButton>
            </div>
        );
    } else {
        return (
            <div className="daily-steps">
                <p>Hey, du hast heute noch keine Schritte erfasst. Willst du welche eintragen?</p>
                <IonButton color={"secondary"} onClick={handleButtonClick}>Jetzt eintragen</IonButton>
            </div>
        );
    }
};

export default DailySteps;
