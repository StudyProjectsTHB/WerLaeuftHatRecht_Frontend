import {IonContent, IonPage} from '@ionic/react';
import {useLocation} from 'react-router-dom';

import ProgressBar from '../../components/charts/ProgressBar';
import React, {useEffect, useState} from "react";
import BarChart from "../../components/charts/BarChart";
import ColumnChart from "../../components/charts/ColumnChart";
import {useHistory} from "react-router";
import {checkToken, getToken, getUser} from "../../util/service/loginService";
import {
    getCourtStatistic,
    getOwnCourtCurrentPlace,
    getCourtOwnStatistic
} from "../../util/service/courtStatisticService";
import {getLapsedDays} from "../../util/service/util";

const CourtStatistics: React.FC = () => {
    const [loading, setLoading] = useState(true);
    const [userAdjective, setUserAdjective] = useState("");
    const [userNoun, setUserNoun] = useState("");
    const [userStepGoal, setUserStepGoal] = useState(0);
    const [group, setGroup] = useState("");
    const [place, setPlace] = useState(1);
    const [maxPlace, setMaxPlace] = useState(1);
    const [ownStatsSteps, setOwnStatsSteps] = useState([0]);
    const [ownStatsWeeks, setOwnStatsWeeks] = useState([""]);
    const [ownStatsLabels, setOwnStatsLabels] = useState([""]);
    const [lapsedDays, setLapsedDays] = useState(0);
    const [ownSteps, setOwnSteps] = useState(0);
    const [nextSteps, setNextSteps] = useState(0);
    const [userComparisonSteps, setUserComparisonSteps] = useState([0]);
    const [userComparisonLabels, setUserComparisonLabels] = useState([""]);

    const history = useHistory();
    const location = useLocation();


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
            const placeMaxPlace = getOwnCourtCurrentPlace(token, user);
            const ownStats = getCourtOwnStatistic(token, user.group);
            const lapsedDays = getLapsedDays(token);
            const courtStats = getCourtStatistic(token, user.group);

            placeMaxPlace.then((response) => {
                setPlace(response[0]);
                setMaxPlace(response[1]);
            });

            ownStats.then((data) => {
                setOwnStatsSteps(data[0]);
                setOwnStatsLabels(data[1]);
                setOwnStatsWeeks(data[2]);
            });

            lapsedDays.then((data) => {
                setLapsedDays(data);
            });

            courtStats.then((data) => {
                const userIndex = data[2].indexOf(user.id);
                const priorUserIndex = userIndex - 1 < 0 ? userIndex : userIndex - 1;
                const statIds = []
                setOwnSteps(data[0][data[2].indexOf(user.id)]);
                setNextSteps(data[0][priorUserIndex]);

                if (userIndex === 0) {
                    statIds.push(0);
                    statIds.push(1);
                    statIds.push(2);
                } else if (userIndex === data[0].length - 1) {
                    statIds.push(data[2].length - 3);
                    statIds.push(data[2].length - 2);
                    statIds.push(data[2].length - 1);
                } else {
                    statIds.push(userIndex - 1);
                    statIds.push(userIndex);
                    statIds.push(userIndex + 1);
                }

                const usersSteps: number[] = [];
                const usersLabels: string[] = [];
                statIds.forEach((id) => {
                    if (data[0][id] === undefined) {
                        return;
                    }
                    usersSteps.push(data[0][id]);
                    usersLabels.push(`${data[1][id]}`);
                });

                setUserComparisonSteps(usersSteps);
                setUserComparisonLabels(usersLabels);
            });
        }
    }, [location]);

    return (
        <IonPage style={{marginTop: '110px', marginBottom: '65px'}} className={"statistics"}>
            <IonContent>
                <h2>So stehst du im Vergleich</h2>
                <div className="flex gridContainer">
                    <div className="wrapper weekly-stats">
                        <ProgressBar value={place} maxValue={maxPlace} type={"CourtPlace"} group={group}></ProgressBar>
                    </div>
                    <div className="wrapper weekly-stats">
                        <ProgressBar value={ownSteps} maxValue={nextSteps} type={"CourtSteps"}></ProgressBar>
                    </div>
                </div>
                <div className="gridContainer">
                    <div className="wrapper">
                        <BarChart labels={userComparisonLabels} barData={userComparisonSteps} ownName={`${userAdjective} ${userNoun}`} type={'statistics'}/>
                    </div>
                    <div className="wrapper">
                        <ColumnChart labels={ownStatsLabels} columnData={ownStatsSteps}
                                     type={'courtStatistics'} weeks={ownStatsWeeks}/>
                    </div>
                </div>
            </IonContent>
        </IonPage>
    );
}

export default CourtStatistics;