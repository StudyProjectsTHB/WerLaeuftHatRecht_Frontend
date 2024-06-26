import {
    IonButton,
    IonContent,
    IonPage,
    IonRouterOutlet,
} from '@ionic/react';
import './Tab3.css';
import {Redirect, Route, useLocation} from 'react-router-dom';

import OwnStatistics from "./Tab3/OwnStatistics";
import AllCourtsStatistics from "./Tab3/AllCourtsStatistics";
import CourtStatistics from "./Tab3/CourtStatistics";
import {useHistory} from "react-router";
import Greeting from "../components/Greeting";
import React from "react";

const Tab3: React.FC = () => {
    const history = useHistory();
    const location = useLocation();

    const getButtonClass = (path: string) => {
        return location.pathname.startsWith(path) ? 'active' : 'secondary';
    };

    return (
        <IonPage>
            <IonContent>
                <Greeting name={"wilder Esel"}/>

                <div className={"NavStats"}>
                    <div className={"buttonContainer"}>
                        <button className={getButtonClass('/tabs/tab3/OwnStatistics')} onClick={() => history.push('/tabs/tab3/OwnStatistics')}>Eigene
                        </button>
                        <button className={getButtonClass('/tabs/tab3/CourtStatistics')} onClick={() => history.push('/tabs/tab3/CourtStatistics')}>OLG XYZ
                        </button>
                        <button className={getButtonClass('/tabs/tab3/AllCourtsStatistics')} onClick={() => history.push('/tabs/tab3/AllCourtsStatistics')}>Alle
                            Gerichte
                        </button>
                    </div>
                </div>

                <IonRouterOutlet>
                    <Route exact path={`/tabs/tab3/OwnStatistics`} component={OwnStatistics}/>
                    <Route exact path={`/tabs/tab3/CourtStatistics`} component={CourtStatistics}/>
                    <Route exact path={`/tabs/tab3/AllCourtsStatistics`} component={AllCourtsStatistics}/>
                    <Route exact path={`/tabs/tab3`} render={() => <Redirect to="/tabs/tab3/OwnStatistics"/>}/>
                </IonRouterOutlet>
            </IonContent>
        </IonPage>
    )
};

export default Tab3;
