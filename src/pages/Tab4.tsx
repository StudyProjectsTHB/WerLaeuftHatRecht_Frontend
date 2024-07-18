import {
    IonContent,
    IonPage,

} from '@ionic/react';
import './Tab3.css';
import {useLocation} from 'react-router-dom';

import {useHistory} from "react-router";
import Greeting from "../components/Greeting";
import React, {useEffect, useState} from "react";
import "./tab4.css";
import {checkToken, getToken, getUser} from "../util/service/loginService";


const Tab4: React.FC = () => {
    const [loading, setLoading] = useState(true);
    const [userAdjective, setUserAdjective] = useState("");
    const [userNoun, setUserNoun] = useState("");
    const [userStepGoal, setUserStepGoal] = useState(0);
    const [group, setGroup] = useState("");

    const history = useHistory();
    const location = useLocation();


    useEffect(() => {
        const fetchData = async () => {
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
                setGroup(user.group.name);


                if (!user.admin) {
                    window.location.assign('/tabs/tab1');
                }
            }
        }
        fetchData();
    }, [location]);

    return (
        <IonPage>
            <IonContent>
                <Greeting adjective={userAdjective} noun={userNoun} group={group}/>
                <div className="container">
                    <div className={"flexAdmin"}>
                        <button onClick={() => history.push('/tabs/tab4/User')}
                                className={"adminButton nutzer"}>Nutzende
                        </button>
                        <button onClick={() => history.push('/tabs/tab4/Courts')}
                                className={"adminButton gerichte"}>Gerichte
                        </button>
                    </div>
                    <div className={"flexAdmin"}>
                        <button onClick={() => history.push('/tabs/tab4/Competition')}
                                className={"adminButton wettbewerb"}>Wettbewerb
                        </button>
                        <button onClick={() => history.push('/tabs/tab4/Statistics')}
                                className={"adminButton stats"}>Statistiken
                        </button>
                        <button onClick={() => history.push('/tabs/tab4/Export')}
                                className={"adminButton export"}>Export
                        </button>
                    </div>
                </div>
            </IonContent>
        </IonPage>
    )
};

export default Tab4;
