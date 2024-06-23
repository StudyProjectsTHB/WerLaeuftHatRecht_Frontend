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
        <IonPage style={{marginTop: '120px', marginBottom: '65px'}}>
            <IonContent>
                <div className="wrapper">
                    <ColumnChart labels={['KW 33', 'KW 34', 'KW 35']} columnData={[65, 81, 55]} type={'statistics'}/>
                </div>
                <div className="wrapper">
                    <BarChart labels={["OLG Brandenburg", "LG Cottbus", "AG Fankfurt (Oder)"]} barData={[6000, 4200, 4000]}/>
                </div>
                <div className="wrapper">
                    <div className="wrapper">
                        <ProgressBar value={1} maxValue={20} type={"AllCourtsPlace"}></ProgressBar>
                    </div>
                    <div className="wrapper">
                        <ProgressBar value={0} maxValue={0} type={"AllCourtsSteps"}></ProgressBar>
                    </div>
                </div>

            </IonContent>
        </IonPage>
    );
}

export default AllCourtsStatistics;