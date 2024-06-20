import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Tab1.css';
import React from "react";

import Greeting from '../components/Greeting';
import DailySteps from '../components/DailySteps';
import WeeklyStats from '../components/WeeklyStats';
import WeeklyChallenges from '../components/WeeklyChallenges';
import BarChart from "../components/charts/ColumnChart";


const Tab1: React.FC = () => {
  return (
    <IonPage>
        <IonContent fullscreen>
            {/*<ExploreContainer name="Tab 1 page" />*/}
            <div className="container">
                <Greeting name={"wilder Esel"}/>
                <DailySteps/>
                <WeeklyStats steps={52576} distance={37.5} rank={3}/>
                <BarChart labels={["Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"]} columnData={[5000, 10000, 15000, 20000, 25000, 30000, 35000]}/>
                <WeeklyChallenges />
            </div>

        </IonContent>
    </IonPage>
  );
};

export default Tab1;
