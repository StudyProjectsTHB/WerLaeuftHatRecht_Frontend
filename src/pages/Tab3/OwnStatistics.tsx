import {IonContent, IonPage, IonToast} from '@ionic/react';
import {useLocation} from 'react-router-dom';

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
import ProgressBar from "../../components/charts/ProgressBar";

const OwnStatistics: React.FC = () => {
    const [loading, setLoading] = useState(true);
    const [userAdjective, setUserAdjective] = useState("");
    const [userNoun, setUserNoun] = useState("");
    const [userStepGoal, setUserStepGoal] = useState(0);
    const [userKilometerGoal, setUserKilometerGoal] = useState(0);
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

    const [message, setMessage] = useState<string | null>(null);
    const [toastColor, setToastColor] = useState<string | null>(null);
    const [showToast, setShowToast] = useState(false);

    const history = useHistory();
    const location = useLocation()


    useEffect(() => {
        const fetchData = async () => {
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
                setUserKilometerGoal(user.stepGoalKilometers)
                setGroup(user.group.name);

                const totSteps = totalStepsAndKilometers(token, user);
                const placeMaxPlace = getOwnCurrentPlace(token, user);
                const challenges = getFinishedWeeklyChallenges(token);
                const ownStats = getOwnStatistic(token, user);
                const lapsedDays = getLapsedDays(token);

                totSteps.then((data) => {
                    setTotalSteps(data[0]);
                    setTotalKilometers(parseFloat(data[1]));
                }).catch((error) => {
                    if (error instanceof TypeError) {
                        setMessage('Schritte konnten nicht geladen werden');
                    } else {
                        setMessage(error.message);
                    }
                    setToastColor('#CD7070');
                    setShowToast(true);
                });

                placeMaxPlace.then((data) => {
                    setPlace(data[0]);
                    setMaxPlace(data[1]);
                }).catch((error) => {
                    if (error instanceof TypeError) {
                        setMessage('Platzierung konnte nicht geladen werden');
                    } else {
                        setMessage(error.message);
                    }
                    setToastColor('#CD7070');
                    setShowToast(true);
                });

                challenges.then((data) => {
                    setFinishedChallenges(data);
                }).catch((error) => {
                    if (error instanceof TypeError) {
                        setMessage('Herausforderungen konnten nicht geladen werden');
                    } else {
                        setMessage(error.message);
                    }
                    setToastColor('#CD7070');
                    setShowToast(true);
                });

                ownStats.then((data) => {
                    setOwnStatsSteps(data[0]);
                    setOwnStatsLabels(data[1]);
                    setOwnStatsWeeks(data[2]);
                }).catch((error) => {
                    if (error instanceof TypeError) {
                        setMessage('Eigene Statistiken konnten nicht geladen werden');
                    } else {
                        setMessage(error.message);
                    }
                    setToastColor('#CD7070');
                    setShowToast(true);
                });

                lapsedDays.then((data) => {
                    setLapsedDays(data);
                }).catch((error) => {
                    if (error instanceof TypeError) {
                        setMessage('Tage konnten nicht geladen werden');
                    } else {
                        setMessage(error.message);
                    }
                    setToastColor('#CD7070');
                    setShowToast(true);
                });
            }
        }
        fetchData();
    }, [location]);

    return (
        <IonPage style={{marginTop: '110px', marginBottom: '65px'}} className={"statistics"}>
            <IonContent>
                <h2>Dein Wettbewerb</h2>
                {/*<div className="wrapper">*/}
                {/*    <WeeklyStats steps={totalSteps} distance={totalKilometers} rank={place}*/}
                {/*                 maxSteps={userStepGoal * lapsedDays} maxDistance={userKilometerGoal * lapsedDays} maxRank={maxPlace}/>*/}
                {/*</div>*/}
                <div className="flex gridContainer">

                    <div className="wrapper weekly-stats">
                        <ProgressBar value={totalSteps} maxValue={userStepGoal * lapsedDays} type={"OverviewSteps"}
                                     group={group}></ProgressBar>
                    </div>
                    <div className="wrapper weekly-stats">
                        <ProgressBar value={totalKilometers} maxValue={userKilometerGoal * lapsedDays}
                                     type={"OverviewDistance"}></ProgressBar>
                    </div>
                </div>
                <div className={"gridContainer"}>

                    <div className="wrapper">
                        <ColumnChart labels={ownStatsLabels} columnData={ownStatsSteps}
                                     type={'statistics'} weeks={ownStatsWeeks}/>
                    </div>
                    <FinishedChallenges finishedChallenges={finishedChallenges}/>
                </div>

            </IonContent>
            <IonToast
                isOpen={showToast}
                onDidDismiss={() => setShowToast(false)}
                message={message}
                duration={3000}
                className={"loggin-toast"}
                cssClass="toast"
                style={{
                    '--toast-background': toastColor
                }}
            />
        </IonPage>
    );
}

export default OwnStatistics;