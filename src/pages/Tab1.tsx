import {IonContent, IonHeader, IonLoading, IonPage, IonTitle, IonToolbar} from '@ionic/react';
import './Tab1.css';
import React, {useEffect, useState} from "react";

import Greeting from '../components/Greeting';
import DailySteps from '../components/DailySteps';
import WeeklyStats from '../components/WeeklyStats';
import WeeklyChallenges from '../components/WeeklyChallenges';
import ColumnChart from "../components/charts/ColumnChart";
import {useHistory} from "react-router";

import {checkToken} from "../util/service/loginService";


const Tab1: React.FC = () => {
    const [loading, setLoading] = useState(true);
    const history = useHistory();






    useEffect(() => {
        if (!checkToken()) {
            history.push('/login');
        }


        // setLoading(false);
    }, [history]);

    if (loading) {
        return <IonLoading isOpen={true} message={'Laden...'} />;
    }


    return (
    <IonPage  style={{marginBottom: '65px'}}>
        <IonContent fullscreen>
            <div className="container">
                <Greeting name={user.adjective + " " + user.noun}/>
                <DailySteps/>
                <h2>Diese Woche</h2>
                <div className={"wrapper"}>
                    <WeeklyStats steps={52769} distance={37.5} rank={3}/>
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
