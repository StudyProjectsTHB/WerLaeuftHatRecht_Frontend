import {IonContent, IonHeader, IonPage, IonRouterOutlet, IonTabs, IonTitle, IonToolbar} from '@ionic/react';
import { Redirect, Route } from 'react-router-dom';
import { IonReactRouter } from '@ionic/react-router';

import ProgressBar from '../../components/charts/ProgressBar';
import LineChart from "../../components/charts/LineChart";
import React from "react";
import BarChart from "../../components/charts/BarChart";
import ColumnChart from "../../components/charts/ColumnChart";

const CourtStatistics: React.FC = () => {
    return (
        <IonPage style={{marginTop: '110px', marginBottom: '65px'}} className={"statistics"}>
            <IonContent>
                <h2>So stehst du im Vergleich</h2>
                <div className="flex">
                    <div className="wrapper weekly-stats">
                        <ProgressBar value={10} maxValue={10} type={"CourtPlace"}></ProgressBar>
                    </div>
                    <div className="wrapper weekly-stats">
                        <ProgressBar value={400} maxValue={5000} type={"CourtSteps"}></ProgressBar>
                    </div>
                </div>
                <div className="wrapper">
                    <BarChart labels={['süßer Elefant', 'wilder Esel', "cooler Hund"]} barData={[6000, 4000, 3500]}/>
                </div>
                <div className="wrapper">
                    <ColumnChart labels={['KW 33', 'KW 34', 'KW 35']} columnData={[65, 81, 55]} type={'statistics'}/>
                </div>

            </IonContent>
        </IonPage>
    );
}

export default CourtStatistics;