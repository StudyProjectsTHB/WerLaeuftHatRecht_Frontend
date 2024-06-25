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
    <IonPage  style={{marginBottom: '65px'}}>
        <IonContent fullscreen>
            <div className="container">
                <Greeting name={"wilder Esel"}/>
                <DailySteps/>
                <h2>Diese Woche</h2>
                <div className={"wrapper"}>
                    <WeeklyStats steps={52576} distance={37.5} rank={3}/>
                </div>
                <div className={"gridContainer"}>
                    <div className={"wrapper barchart"}>
                        <ColumnChart labels={["Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"]}
                                     columnData={[100, 0, 10, 50, 300, 200, 150]} type={'dashboard'}/>
                    </div>
                    <WeeklyChallenges/>
                </div>
            </div>
        </IonContent>
    </IonPage>
  );
};

export default Tab1;
