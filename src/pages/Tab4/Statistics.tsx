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
import {arrowBack} from "ionicons/icons";


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

                    <div className={"flex headline noMargin"}>
                        <h1>Manager Bereich - Statistiken</h1>

                        <div className={"buttonSelect"}>
                            <select
                                value={selectedValue}
                                onChange={e => setSelectedValue(e.target.value)}
                            >
                                <option value="OLG Brandenburg">OLG Brandenburg</option>
                                <option value="AG Cottbus">AG Cottbus</option>
                                <option value="LG Potsdam">LG Potsdam</option>

                            </select>
                            <IonButton>Alle Gerichte</IonButton>
                        </div>
                    </div>
                    <IonList>
        {/*                {users.map((user, index) => (
                            <UserStepsCard key={index} name={user.name} steps={user.steps} index={index + 1} />
                        ))}*/}
                        <UserStepsCard name={"lustiger Luchs"} steps={234334} index={1}/>
                        <UserStepsCard name={"frecher Fuchs"} steps={4556564} index={2}/>
                        <UserStepsCard name={"dummer Dachs"} steps={2} index={3}/>
                    </IonList>

                    <IonButton className={"buttonRight"}>Excel-Datei herunterladen</IonButton>


                </div>
            </IonContent>
        </IonPage>
    )
};

export default Statistics;