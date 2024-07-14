import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import React from "react";
import Greeting from "../components/Greeting";
import CalenderProgressBar from "../components/charts/CalendarProgressBar";
import Calender from "../components/Calendar";
import AddStepsModal from "../components/modals/AddStepsModal";

const Settings: React.FC = () => {
    return (
        <IonPage className={"PageModal Edit settings"} >
            <IonContent fullscreen>
                <Greeting name={"wilder Esel"}/>
                <div>
                    <button onClick={() => console.log("Nutzer clicked")}>Nutzer-Einstellungen</button>
                </div>
                <div>
                    <button onClick={() => console.log("App clicked")}>App-Einstellungen</button>
                </div>
                <div>
                    <button onClick={() => console.log("Logout clicked")}>Logout</button>
                </div>


            </IonContent>
        </IonPage>
    );
}

export default Settings;