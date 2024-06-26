import {IonContent, IonHeader, IonPage, IonRouterOutlet, IonTabs, IonTitle, IonToolbar} from '@ionic/react';
import { Redirect, Route } from 'react-router-dom';
import { IonReactRouter } from '@ionic/react-router';
import LineChart from "../../components/charts/LineChart";
import React from "react";
import BarChart from "../../components/charts/BarChart";
import ProgressBar from "../../components/charts/ProgressBar";
import ColumnChart from "../../components/charts/ColumnChart";

const AllCourtsStatistics: React.FC = () => {
    return (
        <IonPage style={{marginTop: '110px', marginBottom: '65px'}} className={"statistics"}>
            <IonContent>
                <h2>Dein Gericht im Vergleich</h2>
                <div className="flex">
                    <div className="wrapper weekly-stats">
                        <ProgressBar value={1} maxValue={20} type={"AllCourtsPlace"}></ProgressBar>
                    </div>
                    <div className="wrapper weekly-stats">
                        <ProgressBar value={0} maxValue={0} type={"AllCourtsSteps"}></ProgressBar>
                    </div>
                </div>
                <div className="wrapper">
                    <BarChart labels={["OLG Brandenburg", "LG Cottbus", "AG Fankfurt (Oder)"]}
                              barData={[6000, 4200, 4000]}/>
                </div>
                <div className="wrapper">
                    <ColumnChart labels={['KW 33', 'KW 34', 'KW 35']} columnData={[65, 81, 55]} type={'statistics'}/>
                </div>

            </IonContent>
        </IonPage>
    );
}

export default AllCourtsStatistics;