import {IonContent, IonHeader, IonPage, IonRouterOutlet, IonTabs, IonTitle, IonToolbar} from '@ionic/react';
import { Redirect, Route } from 'react-router-dom';
import { IonReactRouter } from '@ionic/react-router';

import ProgressBar from '../../components/charts/ProgressBar';
import LineChart from "../../components/charts/LineChart";
import React from "react";
import BarChart from "../../components/charts/BarChart";

const CourtStatistics: React.FC = () => {
    return (
        <IonPage style={{marginTop: '120px', marginBottom: '65px'}}>
            <IonContent>
                <div className="wrapper">
                    <div className="wrapper">
                        <ProgressBar value={3} maxValue={10} type={"CourtPlace"}></ProgressBar>
                    </div>
                    <div className="wrapper">
                        <ProgressBar value={400} maxValue={5000} type={"CourtSteps"}></ProgressBar>
                    </div>
                </div>
                <div className="wrapper">
                    <LineChart labels={['KW 33', 'KW 33', 'KW 33', 'KW 34', 'KW 34', 'KW 34', 'KW 35', 'KW 35', 'KW 35', ]} chartData={[65, 59, 81, 56, 55, 40, 60, 75, 90]}/>
                </div>
                <div className="wrapper">
                    <BarChart labels={['süßer Elefant', 'wilder Esel', "cooler Hund"]} barData={[6000, 4000, 3500]} />
                </div>
            </IonContent>
        </IonPage>
    );
}

export default CourtStatistics;