import {
    IonButton,
    IonContent,
    IonPage,
    IonRouterOutlet,
} from '@ionic/react';
import './Tab3.css';
import {Redirect, Route, useLocation} from 'react-router-dom';

import Export from "./Tab4/Export";
import User from "./Tab4/User";
import Competition from "./Tab4/Competition";
import Courts from "./Tab4/Courts";
import Statistics from "./Tab4/Statistics";
import {useHistory} from "react-router";
import Greeting from "../components/Greeting";
import React from "react";


const Tab4: React.FC = () => {
    const history = useHistory();
    const location = useLocation();

    return (
        <IonPage>
            <IonContent>
                <Greeting name={"wilder Esel"}/>
                <div className="container">
                    <IonButton onClick={() => history.push('/tabs/tab4/User')}>Nutzende</IonButton>
                    <IonButton onClick={() => history.push('/tabs/tab4/Courts')}>Gerichte</IonButton>
                    <IonButton onClick={() => history.push('/tabs/tab4/Competition')}>Wettbewerb</IonButton>
                    <IonButton onClick={() => history.push('/tabs/tab4/Statistics')}>Statistiken</IonButton>
                    <IonButton onClick={() => history.push('/tabs/tab4/Export')}>Export</IonButton>
                </div>
            </IonContent>
        </IonPage>
    )
};

export default Tab4;
