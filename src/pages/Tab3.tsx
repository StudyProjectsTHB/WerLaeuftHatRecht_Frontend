import {
    IonContent,
    IonPage,
    IonRouterOutlet,
} from '@ionic/react';
import './Tab3.css';
import {Redirect, Route, useLocation} from 'react-router-dom';

import OwnStatistics from "./Tab3/OwnStatistics";
import AllCourtsStatistics from "./Tab3/AllCourtsStatistics";
import CourtStatistics from "./Tab3/CourtStatistics";
import {useHistory} from "react-router";
import Greeting from "../components/Greeting";
import React, {useEffect, useState} from "react";
import {checkToken, getToken, getUser} from "../util/service/loginService";

const Tab3: React.FC = () => {
    const [loading, setLoading] = useState(true);
    const [userAdjective, setUserAdjective] = useState("");
    const [userNoun, setUserNoun] = useState("");
    const [userStepGoal, setUserStepGoal] = useState(0);
    const [group, setGroup] = useState("");


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
        }
    },[location, history]);

    const getButtonClass = (path: string) => {
        return location.pathname.startsWith(path) ? 'active' : 'secondary';
    };

    return (
        <IonPage>
            <IonContent>
                <Greeting adjective={userAdjective} noun={userNoun} group={group} />

                <div className={"NavStats"}>
                    <div className={"buttonContainer"}>
                        <button className={getButtonClass('/tabs/tab3/OwnStatistics')} onClick={() => history.push('/tabs/tab3/OwnStatistics')}>Eigene
                        </button>
                        <button className={getButtonClass('/tabs/tab3/CourtStatistics')} onClick={() => history.push('/tabs/tab3/CourtStatistics')}>{group}
                        </button>
                        <button className={getButtonClass('/tabs/tab3/AllCourtsStatistics')} onClick={() => history.push('/tabs/tab3/AllCourtsStatistics')}>Alle
                            Gerichte
                        </button>
                    </div>
                </div>

                <IonRouterOutlet>
                    <Route exact path={`/tabs/tab3/OwnStatistics`} component={OwnStatistics}/>
                    <Route exact path={`/tabs/tab3/CourtStatistics`} component={CourtStatistics}/>
                    <Route exact path={`/tabs/tab3/AllCourtsStatistics`} component={AllCourtsStatistics}/>
                    <Route exact path={`/tabs/tab3`} render={() => <Redirect to="/tabs/tab3/OwnStatistics"/>}/>
                </IonRouterOutlet>
            </IonContent>
        </IonPage>
    )
};

export default Tab3;
