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
import "./tab4.css";


const Tab4: React.FC = () => {
    const history = useHistory();
    const location = useLocation();

    return (
        <IonPage>
            <IonContent>
                <Greeting name={"wilder Esel"}/>
                <div className="container">
                    <div className={"flexAdmin"}>
                        <button onClick={() => history.push('/tabs/tab4/User')} className={"adminButton nutzer"}>Nutzende</button>
                        <button onClick={() => history.push('/tabs/tab4/Courts')} className={"adminButton gerichte"}>Gerichte</button>
                    </div>
                    <div className={"flexAdmin"}>
                        <button onClick={() => history.push('/tabs/tab4/Competition')} className={"adminButton wettbewerb"}>Wettbewerb</button>
                        <button onClick={() => history.push('/tabs/tab4/Statistics')} className={"adminButton stats"}>Statistiken</button>
                        <button onClick={() => history.push('/tabs/tab4/Export')} className={"adminButton export"}>Export</button>
                    </div>
                </div>
            </IonContent>
        </IonPage>
    )
};

export default Tab4;
