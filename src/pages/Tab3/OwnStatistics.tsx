import {IonContent, IonHeader, IonPage, IonRouterOutlet, IonTabs, IonTitle, IonToolbar} from '@ionic/react';
import { Redirect, Route } from 'react-router-dom';
import { IonReactRouter } from '@ionic/react-router';

import LineChart from '../../components/charts/LineChart';
import ProgressBar from '../../components/charts/ProgressBar';
import WeeklyStats from "../../components/WeeklyStats";
import React from "react";
import FinishedChallenges from "../../components/FinishedChallenges";

const OwnStatistics: React.FC = () => {
    return (
        <IonPage>
            <IonContent>
                <div className="container">
                    <LineChart labels={['KW 33', 'KW 33', 'KW 33', 'KW 34', 'KW 34', 'KW 34', 'KW 35', 'KW 35', 'KW 35', ]} chartData={[65, 59, 81, 56, 55, 40, 60, 75, 90]}/>
                </div>
                <div className="container">
                    <WeeklyStats steps={52576} distance={37.5} rank={3}/>
                </div>
                <FinishedChallenges/>

            </IonContent>
        </IonPage>
    );
}

export default OwnStatistics;