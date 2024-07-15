import {
    IonCard,
    IonCardContent,
    IonContent,
    IonHeader,
    IonIcon,
    IonLoading,
    IonPage,
    IonText,
    IonTitle,
    IonToolbar
} from '@ionic/react';
import './Tab1.css';
import React, {useEffect, useState} from "react";

import Greeting from '../components/Greeting';
import DailySteps from '../components/DailySteps';
import WeeklyStats from '../components/WeeklyStats';
import WeeklyChallenges from '../components/WeeklyChallenges';
import ColumnChart from "../components/charts/ColumnChart";
import {useHistory} from "react-router";

import {checkToken, getToken, getUser} from "../util/service/loginService";
import {
    getCurrentPlace, getCurrentWeather, getWeeklyChallenges,
    getWeeklyChartSteps,
    todaysSteps,
    weeklyStepsAndKilometers
} from "../util/service/overviewStatisticService";
import {useLocation} from "react-router-dom";
import {personOutline, sunnyOutline} from "ionicons/icons";
import Weather from "../components/cards/Weather";

const Tab1: React.FC = () => {
    const [loading, setLoading] = useState(true);
    const [userAdjective, setUserAdjective] = useState("");
    const [userNoun, setUserNoun] = useState("");
    const [userStepGoal, setUserStepGoal] = useState(0);
    const [userKilometerGoal, setUserKilometerGoal] = useState(0);
    const [group, setGroup] = useState("");
    const [dailySteps, setDailySteps] = useState(0);
    const [weeklySteps, setWeeklySteps] = useState(0);
    const [weeklyKilometers, setWeeklyKilometers] = useState(0);
    const [place, setPlace] = useState(1);
    const [maxPlace, setMaxPlace] = useState(1);
    const [weeklyChartSteps, setWeeklyChartSteps] = useState([0, 0, 0, 0, 0, 0, 0]);
    const [weeklyChartDays, setWeeklyChartDays] = useState(["Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"]);
    const [weeklyChallenges, setWeeklyChallenges] = useState([]);
    const [weatherToday, setWeatherToday] = useState({temperature: 0, condition: ''});
    const [weatherTomorrow, setWeatherTomorrow] = useState({temperature: 0, condition: ''});

    const history = useHistory();
    const location = useLocation()


    useEffect(() => {
        if (!checkToken()) {
            // history.push('/login', {direction: 'none'});
            window.location.assign('/login');
        }

        const token = getToken();
        const user = getUser(token);
        if (token && user) {
            setUserAdjective(user.adjective);
            setUserNoun(user.noun);
            setUserStepGoal(user.stepGoal)
            setUserKilometerGoal(user.stepGoalKilometers)
            setGroup(user.group.name);


            const stepsToday = todaysSteps(token, user);
            const weeklyStats = weeklyStepsAndKilometers(token, user);
            const placeMaxPlace = getCurrentPlace(token, user);
            const weeklyChart = getWeeklyChartSteps(token, user);
            const weeklyChallenges = getWeeklyChallenges(token);
            const weatherToday = getCurrentWeather(token);


            stepsToday.then((data) => {
                setDailySteps(data);
            });

            weeklyStats.then((data) => {
                setWeeklySteps(data[0]);
                setWeeklyKilometers(parseFloat(data[1]));
            });

            placeMaxPlace.then((data) => {
                setPlace(data[0]);
                setMaxPlace(data[1]);
            });

            weeklyChart.then((data) => {
                const steps = data[0]
                const days = data[1]
                setWeeklyChartSteps(steps);
                setWeeklyChartDays(days);
            });

            weeklyChallenges.then((data) => {
                setWeeklyChallenges(data);
            })

            weatherToday.then((data) => {
                setWeatherToday({temperature: data.today.maxTemperature, condition: data.today.weather});
                setWeatherTomorrow({temperature: data.tomorrow.maxTemperature, condition: data.tomorrow.weather});
                console.log(data);
                console.log(weatherToday, weatherTomorrow);
            });
        }

        // setLoading(false);
    }, [location, history]);

    // if (loading) {
    //     return <IonLoading isOpen={true} message={'Laden...'} />;
    // }


    return (
        <IonPage style={{marginBottom: '65px'}}>
            <IonContent fullscreen>
                <div className="container">
                    <Greeting adjective={userAdjective} noun={userNoun} group={group}/>
                    <DailySteps steps={dailySteps}/>
                    <h2>Diese Woche</h2>
                    <div className={"wrapper"}>
                        <WeeklyStats steps={weeklySteps} distance={weeklyKilometers} rank={place}
                                     maxSteps={userStepGoal * 7} maxDistance={userKilometerGoal * 7} maxRank={maxPlace}/>
                    </div>
                    <div className={"gridContainer"}>
                        <div className={"wrapper barchart"}>
                            <ColumnChart labels={weeklyChartDays}
                                         columnData={weeklyChartSteps} type={'dashboard'}/>
                        </div>
                        <WeeklyChallenges weeklyChallenges={weeklyChallenges}/>
                    </div>

                    <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center',}}>
                        <Weather temperature={weatherToday.temperature} condition={weatherTomorrow.condition} label={"Heute"}/>
                        <Weather temperature={weatherTomorrow.temperature} condition={weatherTomorrow.condition} label={"Morgen"}/>

                    </div>

                </div>
            </IonContent>
        </IonPage>
    );
};

export default Tab1;
