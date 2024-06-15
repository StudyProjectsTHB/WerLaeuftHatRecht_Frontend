import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Tab1.css';
import React from "react";

import Greeting from '../components/Greeting';
import DailySteps from '../components/DailySteps';
import WeeklyStats from '../components/WeeklyStats';
import WeeklyChart from '../components/WeeklyChart';
import WeeklyChallenges from '../components/WeeklyChallenges';
import BarChart from "../components/BarChart";


const Tab1: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Tab 1</IonTitle>
        </IonToolbar>
      </IonHeader>
        <IonContent fullscreen>
            <IonHeader collapse="condense">
                <IonToolbar>
                    <IonTitle size="large">Tab 1</IonTitle>
                </IonToolbar>
            </IonHeader>
            {/*<ExploreContainer name="Tab 1 page" />*/}
            <div className="container">
                <Greeting name={"wilder Esel"}/>
                <DailySteps/>
                <WeeklyStats steps={52576} distance={37.5} rank={3}/>
                {/*<BarChart chartData={[1000, 2000, 4000, 5000, 3500, 2500, 2000]} />*/}
                <WeeklyChallenges />
            </div>

        </IonContent>
    </IonPage>
  );
};

export default Tab1;
