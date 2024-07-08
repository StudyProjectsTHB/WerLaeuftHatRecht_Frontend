import {IonContent, IonHeader, IonIcon, IonPage, IonTitle, IonToolbar} from '@ionic/react';
import React from "react";
import Greeting from "../components/Greeting";
import CalenderProgressBar from "../components/charts/CalenderProgressBar";
import Calender from "../components/Calender";
import AddStepsModal from "../components/modals/AddStepsModal";
import {arrowBack, arrowForwardOutline, logOutOutline, personOutline, settingsOutline} from "ionicons/icons";
import user from "./Tab4/User";

const Settings: React.FC = () => {
    return (
        <IonPage className={"PageModal Edit settings"} >
            <IonContent fullscreen>
                <h1>Einstellungen</h1>
                <Greeting name={"wilder Esel"}/>
                <div className={"settingsContainer"}>
                    <div className={"flexSetting"}>
                        <div>
                            <IonIcon aria-hidden="true" icon={personOutline}/>
                            <button onClick={() => console.log("Nutzer clicked")}>Nutzer-Einstellungen</button>
                        </div>
                        <IonIcon aria-hidden="true" icon={arrowForwardOutline}/>
                    </div>
                    <div className={"flexSetting app"}>
                        <div>
                            <IonIcon aria-hidden="true" icon={settingsOutline}/>
                            <button onClick={() => console.log("App clicked")}>App-Einstellungen</button>
                        </div>
                        <IonIcon aria-hidden="true" icon={arrowForwardOutline}/>
                    </div>
                    <div className={"flexSetting logout"}>
                        <div>
                            <IonIcon aria-hidden="true" icon={logOutOutline}/>
                            <button onClick={() => console.log("Logout clicked")}>Logout</button>
                        </div>
                        <IonIcon aria-hidden="true" icon={arrowForwardOutline}/>
                    </div>
                </div>


            </IonContent>
        </IonPage>
    );
}

export default Settings;