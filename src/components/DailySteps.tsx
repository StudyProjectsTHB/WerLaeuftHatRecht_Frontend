import React from 'react';
import { IonButton } from '@ionic/react';
import {useHistory} from "react-router";

const DailySteps: React.FC = () => {
    const history = useHistory();

    const handleButtonClick = () => {
        history.push("/tabs/tab2?showModal=true")
    }
    return (
        <div className="daily-steps">
            <p>Hey, du hast heute noch keine Schritte erfasst.</p>
            <IonButton color={"secondary"} onClick={handleButtonClick}>Jetzt eintragen</IonButton>
        </div>
    );
};

export default DailySteps;
