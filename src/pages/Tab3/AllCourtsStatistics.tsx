import {IonContent, IonPage} from '@ionic/react';
import {useLocation} from 'react-router-dom';
import React, {useEffect, useState} from "react";
import BarChart from "../../components/charts/BarChart";
import ProgressBar from "../../components/charts/ProgressBar";
import ColumnChart from "../../components/charts/ColumnChart";
import {checkToken, getToken, getUser} from "../../util/service/loginService";
import {useHistory} from "react-router";
import {
    getCourtCurrentPlace,
    getCourtsStatistic,
    getOwnCourtStatistic
} from "../../util/service/allCourtsStatisticService";

const AllCourtsStatistics: React.FC = () => {
    const [loading, setLoading] = useState(true);
    const [userAdjective, setUserAdjective] = useState("");
    const [userNoun, setUserNoun] = useState("");
    const [userStepGoal, setUserStepGoal] = useState(0);
    const [group, setGroup] = useState("");
    const [place, setPlace] = useState(1);
    const [maxPlace, setMaxPlace] = useState(1);
    const [ownCourtSteps, setOwnCourtSteps] = useState(0);
    const [nextCourtSteps, setNextCourtSteps] = useState(0);
    const [courtComparisonSteps, setCourtComparisonSteps] = useState([0]);
    const [courtComparisonLabels, setCourtComparisonLabels] = useState([""]);
    const [courtStatsSteps, setCourtStatsSteps] = useState([0]);
    const [courtStatsLabels, setCourtStatsLabels] = useState([""]);
    const [courtStatsWeeks, setCourtStatsWeeks] = useState([""]);


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

            const placeMaxPlace = getCourtCurrentPlace(token, user.group);
            const courtsStats = getCourtsStatistic(token);
            const courtStats = getOwnCourtStatistic(token, user.group);

            placeMaxPlace.then((response) => {
                setPlace(response[0]);
                setMaxPlace(response[1]);
            });

            courtsStats.then((data) => {
                const groupIndex = data[2].indexOf(user.group.id);
                const priorGroupIndex = groupIndex - 1 < 0 ? groupIndex : groupIndex - 1;
                const statIds = []
                setOwnCourtSteps(data[0][data[2].indexOf(user.group.id)]);
                setNextCourtSteps(data[0][priorGroupIndex]);

                if (groupIndex === 0) {
                    statIds.push(0);
                    statIds.push(1);
                    statIds.push(2);
                } else if (groupIndex === data[0].length - 1) {
                    statIds.push(data[2].length - 3);
                    statIds.push(data[2].length - 2);
                    statIds.push(data[2].length - 1);
                } else {
                    statIds.push(groupIndex - 1);
                    statIds.push(groupIndex);
                    statIds.push(groupIndex + 1);
                }

                const courtsSteps: number[] = [];
                const courtsLabels: string[] = [];
                statIds.forEach((id) => {
                    if (data[0][id] === undefined) {
                        return;
                    }
                    courtsSteps.push(data[0][id]);
                    courtsLabels.push(`${data[1][id]}`);
                });

                setCourtComparisonSteps(courtsSteps);
                setCourtComparisonLabels(courtsLabels);

            });

            courtStats.then((data) => {
                setCourtStatsSteps(data[0]);
                setCourtStatsLabels(data[1]);
                setCourtStatsWeeks(data[2]);
            });

        }
    }, [location]);

    return (
        <IonPage style={{marginTop: '110px', marginBottom: '65px'}} className={"statistics"}>
            <IonContent>
                <h2>Dein Gericht im Vergleich</h2>
                <div className="flex gridContainer">
                    <div className="wrapper weekly-stats">
                        <ProgressBar value={place} maxValue={maxPlace} type={"AllCourtsPlace"}></ProgressBar>
                    </div>
                    <div className="wrapper weekly-stats">
                        <ProgressBar value={ownCourtSteps} maxValue={nextCourtSteps} type={"AllCourtsSteps"}></ProgressBar>
                    </div>
                </div>
                <div className="gridContainer">
                    <div className="wrapper">
                        <BarChart labels={courtComparisonLabels} barData={courtComparisonSteps} ownName={group} type={'courtStatistics'}/>
                    </div>
                    <div className="wrapper">
                        <ColumnChart labels={courtStatsLabels} columnData={courtStatsSteps}
                                     type={'courtStatistics'} weeks={courtStatsWeeks}/>
                    </div>
                </div>
            </IonContent>
        </IonPage>
    );
}

export default AllCourtsStatistics;