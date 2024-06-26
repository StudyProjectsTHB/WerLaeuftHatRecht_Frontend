import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import React from "react";
import Greeting from "../components/Greeting";
import CalenderProgressBar from "../components/charts/CalenderProgressBar";
import Calender from "../components/Calender";
import AddStepsModal from "../components/AddStepsModal";

const Settings: React.FC = () => {
    return (
        <IonPage className={"PageModal Edit"} >
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