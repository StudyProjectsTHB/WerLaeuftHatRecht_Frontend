import {IonContent, IonHeader, IonPage, IonRouterOutlet, IonTabs, IonTitle, IonToolbar} from '@ionic/react';
import {Redirect, Route, useLocation} from 'react-router-dom';
import { IonReactRouter } from '@ionic/react-router';

import LineChart from '../../components/charts/LineChart';
import ProgressBar from '../../components/charts/ProgressBar';
import WeeklyStats from "../../components/WeeklyStats";
import React, {useEffect, useState} from "react";
import FinishedChallenges from "../../components/FinishedChallenges";
import ColumnChart from "../../components/charts/ColumnChart";
import {checkToken, getToken, getUser} from "../../util/service/loginService";
import {useHistory} from "react-router";
import {
    totalStepsAndKilometers,
    getFinishedWeeklyChallenges,
    getOwnCurrentPlace,
    getOwnStatistic,
} from "../../util/service/ownStatisticService";
import {getLapsedDays} from "../../util/service/util";

const OwnStatistics: React.FC = () => {
    const [loading, setLoading] = useState(true);
    const [userAdjective, setUserAdjective] = useState("");
    const [userNoun, setUserNoun] = useState("");
    const [userStepGoal, setUserStepGoal] = useState(0);
    const [group, setGroup] = useState("");
    const [totalSteps, setTotalSteps] = useState(0);
    const [totalKilometers, setTotalKilometers] = useState(0);
    const [place, setPlace] = useState(1);
    const [maxPlace, setMaxPlace] = useState(1);
    const [finishedChallenges, setFinishedChallenges] = useState([]);
    const [ownStatsSteps, setOwnStatsSteps] = useState([0]);
    const [ownStatsLabels, setOwnStatsLabels] = useState(['']);
    const [ownStatsWeeks, setOwnStatsWeeks] = useState(['']);
    const [lapsedDays, setLapsedDays] = useState(0);

    const history = useHistory();
    const location = useLocation()


    useEffect(() => {
        if (!checkToken()) {
            // history.push('/login');
            window.location.assign('/login');
        }
        const token = getToken();
        const user = getUser(token);
        if (token && user) {
            setUserAdjective(user.adjective);
            setUserNoun(user.noun);
            setUserStepGoal(user.stepGoal)
            setGroup(user.group.name);
            setLoading(false);

            const totSteps = totalStepsAndKilometers(token, user);
            const placeMaxPlace = getOwnCurrentPlace(token, user);
            const challenges = getFinishedWeeklyChallenges(token);
            const ownStats = getOwnStatistic(token, user);
            const lapsedDays = getLapsedDays(token);

            totSteps.then((data) => {
                setTotalSteps(data[0]);
                setTotalKilometers(parseFloat(data[1]));
            });

            placeMaxPlace.then((data) => {
                setPlace(data[0]);
                setMaxPlace(data[1]);
            });

            challenges.then((data) => {
                setFinishedChallenges(data);
            });

            ownStats.then((data) => {
                setOwnStatsSteps(data[0]);
                setOwnStatsLabels(data[1]);
                setOwnStatsWeeks(data[2]);
            });

            lapsedDays.then((data) => {
                setLapsedDays(data);
            });
        }
    }, [location, history]);

            return (
        <IonPage style={{marginTop: '110px', marginBottom: '65px'}} className={"statistics"}>
            <IonContent>
                <h2>Dein Wettbewerb</h2>
                <div className="wrapper">
                    <WeeklyStats steps={totalSteps} distance={totalKilometers} rank={place}
                                 maxSteps={userStepGoal * lapsedDays} maxDistance={50} maxRank={maxPlace}/>
                </div>
                <div className={"gridContainer"}>

                <div className="wrapper">
                    <ColumnChart labels={ownStatsLabels} columnData={ownStatsSteps}
                                 type={'statistics'} weeks={ownStatsWeeks}/>
                </div>
                <FinishedChallenges finishedChallenges={finishedChallenges}/>
                </div>

            </IonContent>
        </IonPage>
    );
}

export default OwnStatistics;