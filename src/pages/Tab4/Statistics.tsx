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

                    <h2>Manager Bereich - Statistiken</h2>

                    <IonSelect
                        value={selectedValue}
                        placeholder="Select an option"
                        onIonChange={e => setSelectedValue(e.detail.value)}
                    >
                        <IonSelectOption value="OLG Brandenburg">OLG Brandenburg</IonSelectOption>
                        <IonSelectOption value="AG Cottbus">AG Cottbus</IonSelectOption>
                        <IonSelectOption value="LG Potsdam">LG Potsdam</IonSelectOption>

                    </IonSelect>
                    <IonButton>Alle Gerichte</IonButton>
                    <IonList>
                        <UserStepsCard name={"lustiger Luchs"} steps={234334}/>
                        <UserStepsCard name={"frecher Fuchs"} steps={4556564}/>
                        <UserStepsCard name={"dummer Dachs"} steps={2}/>
                    </IonList>

                    <IonButton>Excel-Datei herunterladen</IonButton>


                </div>
            </IonContent>
        </IonPage>
    )
};

export default Statistics;