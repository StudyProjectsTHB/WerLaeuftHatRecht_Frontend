import {IonContent, IonHeader, IonLoading, IonPage, IonTitle, IonToolbar} from '@ionic/react';
import './Tab1.css';
import React, {useEffect, useState} from "react";

import Greeting from '../components/Greeting';
import DailySteps from '../components/DailySteps';
import WeeklyStats from '../components/WeeklyStats';
import WeeklyChallenges from '../components/WeeklyChallenges';
import ColumnChart from "../components/charts/ColumnChart";
import {useHistory} from "react-router";
import {jwtDecode} from 'jwt-decode';


const Tab1: React.FC = () => {
    const [loading, setLoading] = useState(true);
    const history = useHistory();

    const token = localStorage.getItem('authToken');
    const user = JSON.parse(localStorage.getItem('user'));

    const checkToken = async () => {
        if (!token) {
            history.push('/login');
            return;
        }

        try {
            const decodedToken = jwtDecode(token);

            // `exp`-Claim extrahieren (in Sekunden seit Epoch)
            const expirationTimeInSeconds = decodedToken.exp

            console.log('Decoded token:', decodedToken);

            const currentDateTime = new Date().getTime() / 1000;

            console.log('Current date time:', currentDateTime);

            // Überprüfe, ob der Token abgelaufen ist
            if (expirationTimeInSeconds < currentDateTime) {
                console.error('Token expired');
                localStorage.removeItem('authToken');
                history.push('/login');
                return;
            } else {
                console.log('Token valid');
                setLoading(false);
                console.log("Loading: ", loading)
            }

        } catch (error) {
            console.error("Invalid token", error);
            localStorage.removeItem('authToken');
            localStorage.removeItem('user');
            history.push('/login');
        }
    };

    const weeklySteps = async () => {
        console.log(token)
        const response = await fetch('http://localhost:8080/api/days', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });
        const all_steps = await response.json();

        const weekly_steps = all_steps.filter((day: { date: string; }) => {
            const date = new Date(day.date);
            const today = new Date();
            return date >= new Date(today.setDate(today.getDate() - 7));
        });
        const steps = weekly_steps.map((day: { steps: number; }) => day.steps);
        const totalSteps = steps.reduce((a: number, b: number) => a + b, 0);
        const kilometers = weekly_steps.map((day: { kilometers: number; }) => day.kilometers);
        const totalKilometers = kilometers.reduce((a: number, b: number) => a + b, 0);
        console.log(totalKilometers);
        console.log(totalSteps);
        return {totalSteps, totalKilometers, steps};
    };



    useEffect(() => {
        checkToken();
        weeklySteps();
    }, [history]);

    // if (loading) {
    //     return <IonLoading isOpen={true} message={'Laden...'} />;
    // }


    // const {totalSteps, totalKilometers, steps} = weeklySteps()

    // const place = async () => {
    //
    // }


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
