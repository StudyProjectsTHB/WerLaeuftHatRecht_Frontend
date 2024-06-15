import React from 'react';
import { IonButton } from '@ionic/react';

const DailySteps: React.FC = () => {
    return (
        <div className="daily-steps">
            <p>Hey, du hast heute noch keine Schritte erfasst.</p>
            <IonButton>Jetzt eintragen</IonButton>
        </div>
    );
};

export default DailySteps;
