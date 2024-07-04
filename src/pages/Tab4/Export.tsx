import {
    IonButton,
    IonContent, IonIcon, IonItem, IonList,
    IonPage, IonPopover,
    IonRouterOutlet, IonSelect, IonSelectOption,
} from '@ionic/react';
import {Redirect, Route, useLocation} from 'react-router-dom';


import {useHistory} from "react-router";

import React, {useRef, useState} from "react";
import Greeting from "../../components/Greeting";
import UserCard from "../../components/cards/UserCard";
import UserStepsCard from "../../components/cards/UserStepsCard";
import {arrowBack, ellipse} from "ionicons/icons";


const Statistics: React.FC = () => {
    const [selectedValue, setSelectedValue] = useState<string | undefined>("Alle Gerichte");
    const history = useHistory();
    const location = useLocation();

    return (
        <IonPage>
            <IonContent>
                <Greeting name={"wilder Esel"}/>

                <div className={"container"}>
                    <button onClick={() => {
                        history.push("/tabs/tab4")
                    }} className={"buttonBack"}>
                        <IonIcon aria-hidden="true" icon={arrowBack}/>
                        <p>Zurück</p>
                    </button>

                    <h1>Manager Bereich - Export</h1>
                        <div className={"adminButton export2"}>
                            <div className={"name"}>
                                <p>Rangliste</p>
                            </div>
                            <div className={"buttonSelect"}>
                                <select
                                    value={selectedValue}
                                    onChange={e => setSelectedValue(e.target.value)}
                                >
                                    <option value="Alle Gerichte">Alle Gerichte</option>
                                    <option value="OLG Brandenburg">OLG Brandenburg</option>
                                    <option value="OLG Cottbus">OLG Cottbus</option>
                                    <option value="LG Potsdam">LG Potsdam</option>
                                </select>
                                <IonButton>
                                    Excel-Datei herunterladen
                                </IonButton>
                            </div>
                        </div>
                    <div className={"adminButton export2"}>
                        <div className={"name"}>
                            <p>Rangliste aller Gerichte</p>
                        </div>
                        <div className={"buttonSelect"}>
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