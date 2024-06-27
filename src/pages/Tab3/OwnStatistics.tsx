import {IonContent, IonHeader, IonPage, IonRouterOutlet, IonTabs, IonTitle, IonToolbar} from '@ionic/react';
import { Redirect, Route } from 'react-router-dom';
import { IonReactRouter } from '@ionic/react-router';

import LineChart from '../../components/charts/LineChart';
import ProgressBar from '../../components/charts/ProgressBar';
import WeeklyStats from "../../components/WeeklyStats";
import React from "react";
import FinishedChallenges from "../../components/FinishedChallenges";
import ColumnChart from "../../components/charts/ColumnChart";

const OwnStatistics: React.FC = () => {
    return (
        <IonPage style={{marginTop: '110px', marginBottom: '65px'}} className={"statistics"}>
            <IonContent>
                <h2>Dein Wettbewerb</h2>
                <div className="wrapper">
                    <WeeklyStats steps={52576} distance={37.5} rank={3}/>
                </div>
                <div className="wrapper">
                    <ColumnChart labels={['KW 33', 'KW 34', 'KW 35']} columnData={[300, 5000, 600]}
                                 type={'statistics'}/>
                </div>
                <FinishedChallenges/>

            </IonContent>
        </IonPage>
    );
}

export default OwnStatistics;