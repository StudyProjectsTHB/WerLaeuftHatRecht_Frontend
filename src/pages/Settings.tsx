import {IonContent, IonHeader, IonIcon, IonPage, IonTitle, IonToolbar} from '@ionic/react';
import React, {useEffect, useState} from "react";
import Greeting from "../components/Greeting";
import CalenderProgressBar from "../components/charts/CalendarProgressBar";
import Calender from "../components/Calendar";
import AddStepsModal from "../components/modals/AddStepsModal";
import {arrowBack, arrowForwardOutline, logOutOutline, personOutline, settingsOutline} from "ionicons/icons";
import user from "./Tab4/User";
import {useHistory} from "react-router";
import {useLocation} from "react-router-dom";
import {checkToken, getToken, getUser, loginUser, logoutUser} from "../util/service/loginService";

const Settings: React.FC = () => {
    const [loading, setLoading] = useState(true);
    const [userAdjective, setUserAdjective] = useState("");
    const [userNoun, setUserNoun] = useState("");
    const [userStepGoal, setUserStepGoal] = useState(0);
    const [group, setGroup] = useState("");


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
            setGroup(user.group.name);
            setLoading(false);
        }
    }, [location, history]);

    const logout = () => {
        logoutUser();
        window.location.assign('/login');
    }

    return (
        <IonPage className={"PageModal Edit settings"}>
            <IonContent fullscreen>
                <h1>Einstellungen</h1>
                <Greeting adjective={userAdjective} noun={userNoun} group={group}/>
                <div className={"settingsContainer"}>
                    <div className={"flexSetting clickable"}>
                        <div>
                            <IonIcon aria-hidden="true" icon={personOutline}/>
                            <button onClick={() => console.log("Nutzer clicked")}>Nutzer-Einstellungen</button>
                        </div>
                        <IonIcon aria-hidden="true" icon={arrowForwardOutline}/>
                    </div>
                    <div className={"flexSetting app clickable"}>
                        <div>
                            <IonIcon aria-hidden="true" icon={settingsOutline}/>
                            <button onClick={() => console.log("App clicked")}>App-Einstellungen</button>
                        </div>
                        <IonIcon aria-hidden="true" icon={arrowForwardOutline}/>
                    </div>
                    <div className={"flexSetting logout clickable"}  onClick={logout}>
                        <div>
                            <IonIcon aria-hidden="true" icon={logOutOutline}/>
                            <button onClick={logout}>Logout</button>
                        </div>
                        <IonIcon aria-hidden="true" icon={arrowForwardOutline}/>
                    </div>
                </div>


            </IonContent>
        </IonPage>
    );
}

export default Settings;