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

    useEffect(() => {
        const checkToken = async () => {

            // const token = localStorage.getItem('authToken');
            //
            // if (!token) {
            //     history.push('/login');
            //     return;
            // }
            //
            // try {
            //     // Dekodiere den Token
            //     const decodedToken = jwtDecode(token);
            //
            //     // `exp`-Claim extrahieren (in Sekunden seit Epoch)
            //     const expirationTimeInSeconds = decodedToken.exp
            //
            //     console.log('Decoded token:', decodedToken);
            //
            //     // `exp`-Claim in ein Date-Objekt umwandeln
            //     const expirationDate = new Date(expirationTimeInSeconds * 1000);
            //
            //     console.log('Token expires at:', expirationDate);
            // } catch (error) {
            //     console.error("Invalid token", error);
            //     return null;
            // }

            const token = localStorage.getItem('authToken');

            if (!token) {
                history.push('/login');
                return;
            }

            console.log('Token:', token);

            try {
                const response = await fetch('http://localhost:8080/api/days', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                });

                console.log(response);

                if (response.ok) {
                    // Token ist gültig
                    setLoading(false);
                } else {
                    throw new Error('Token verification failed');
                }
            } catch (error) {
                console.error('Token verification failed:', error);
                localStorage.removeItem('authToken');
                history.push('/login');
            }
        };

        checkToken();
    }, [history]);

    if (loading) {
        return <IonLoading isOpen={true} message={'Laden...'} />;
    }


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
