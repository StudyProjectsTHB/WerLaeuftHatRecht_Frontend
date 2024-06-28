import {
    IonButton,
    IonContent, IonItem, IonList,
    IonPage, IonPopover,
    IonRouterOutlet, IonSelect, IonSelectOption,
} from '@ionic/react';
import {Redirect, Route, useLocation} from 'react-router-dom';


import {useHistory} from "react-router";

import React, {useRef, useState} from "react";
import Greeting from "../../components/Greeting";
import UserCard from "../../components/cards/UserCard";
import UserStepsCard from "../../components/cards/UserStepsCard";
import {ellipse} from "ionicons/icons";


const Statistics: React.FC = () => {
    const [selectedValue, setSelectedValue] = useState<string | undefined>("Alle Gerichte");
    const history = useHistory();
    const location = useLocation();

    return (
        <IonPage>
            <IonContent>
                <Greeting name={"wilder Esel"}/>

                <div className={"container"}>
                    <IonButton onClick={() => {
                        history.push("/tabs/tab4")
                    }}>Zurück</IonButton>

                    <h2>Manager Bereich - Export</h2>

                    <div className="container">
                        <img
                            src="images/UserIcon.png"
                            alt="greeting-icon"
                        />
                        <div>
                            <p>Rangliste</p>
                            <IonSelect
                                value={selectedValue}
                                placeholder="Wähle ein Gericht aus"
                                onIonChange={e => setSelectedValue(e.detail.value)}
                            >
                                <IonSelectOption value="Alle Gerichte">Alle Gerichte</IonSelectOption>
                                <IonSelectOption value="OLG Brandenburg">OLG Brandenburg</IonSelectOption>
                                <IonSelectOption value="OLG Cottbus">OLG Cottbus</IonSelectOption>
                                <IonSelectOption value="LG Potsdam">LG Potsdam</IonSelectOption>
                            </IonSelect>
                            <IonButton>
                                Excel-Datei herunterladen
                            </IonButton>
                        </div>
                        <div>
                            <p>Rangliste alles Gerichte</p>
                            <IonButton>
                                Excel-Datei herunterladen
                            </IonButton>
                        </div>
                    </div>
                </div>
            </IonContent>
        </IonPage>
    )
};

export default Statistics;