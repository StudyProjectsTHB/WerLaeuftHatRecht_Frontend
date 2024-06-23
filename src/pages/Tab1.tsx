import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import './Tab1.css';
import React from "react";

import Greeting from '../components/Greeting';
import DailySteps from '../components/DailySteps';
import WeeklyStats from '../components/WeeklyStats';
import WeeklyChallenges from '../components/WeeklyChallenges';
import ColumnChart from "../components/charts/ColumnChart";


const Tab1: React.FC = () => {
  return (
    <IonPage>
        <IonContent fullscreen>
            <div className="container">
                <Greeting name={"wilder Esel"}/>
                <DailySteps/>
                <h2>Diese Woche</h2>
                <WeeklyStats steps={52576} distance={37.5} rank={3}/>
                <ColumnChart labels={["Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"]}
                          columnData={[100, 0, 10, 50, 300, 200, 150]} type={'dashboard'}/>
                <WeeklyChallenges/>
            </div>
        </IonContent>
    </IonPage>
  );
};

export default Tab1;
