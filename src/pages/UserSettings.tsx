import {IonButton, IonContent, IonIcon, IonPage} from '@ionic/react';
import React, {useEffect, useState} from "react";
import Greeting from "../components/Greeting";
import {arrowForwardOutline, logOutOutline, personOutline, settingsOutline} from "ionicons/icons";
import {useHistory} from "react-router";
import {useLocation} from "react-router-dom";
import {checkToken, getToken, getUser, logoutUser} from "../util/service/loginService";

const UserSettings: React.FC = () => {
    const [loading, setLoading] = useState(true);
    const [userAdjective, setUserAdjective] = useState("");
    const [userNoun, setUserNoun] = useState("");
    const [userStepGoal, setUserStepGoal] = useState(0);
    const [group, setGroup] = useState("");
    const [userStepSize, setUserStepSize] = useState(0);
    const [userHeight, setUserHeight] = useState(0);


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
            setUserStepGoal(user.stepGoal);
            setUserStepSize(user.stepSize ? user.stepSize : 0);
            setUserHeight(user.height ? user.height : 0);

            setGroup(user.group.name);
            setLoading(false);
        }
    }, [location]);

    const logout = () => {
        logoutUser();
        window.location.assign('/login');
    }

    return (
        <IonPage className={"PageModal Edit settings"}>
            <IonContent fullscreen>
                <h1>Persönliche Einstellungen</h1>
                <Greeting adjective={userAdjective} noun={userNoun} group={group}/>
                <div className={"settingsContainer"}>
                    <div>
                        <h2>Ziele</h2>
                        <p> Hier können Sie Ihr Schrittziel anpassen. </p>
                        <div className={"flexSetting"}>
                            <div>
                                <p> Schrittziel: </p>
                                <input
                                    type={"number"}
                                    value={userStepGoal}
                                    onChange={(e) => setUserStepGoal(parseInt(e.target.value))}
                                />
                                <span> Schritte</span>
                            </div>
                        </div>
                        <h2>Größe und Schrittbreite</h2>
                        <p> Hier können Sie Ihre Größe und Schrittbreite anpassen für eine genauere Distanzberechnung. </p>
                        <p> Bitte beachten Sie, dass Sie nur einen Wert angeben können. </p>
                        <div className={"flexSetting"}>
                            <div>
                                <p> Größe: </p>
                                <input
                                    type={"number"}
                                    value={userHeight}
                                    placeholder="cm"
                                    onChange={(e) => setUserHeight(parseInt(e.target.value))}
                                />
                                <span>cm</span>
                            </div>

                            <div>
                                <p> Schrittbreite: </p>
                                <input
                                    type={"number"}
                                    value={userStepSize}
                                    onChange={(e) => setUserStepSize(parseInt(e.target.value))}
                                />
                                <span className="unit">cm</span>
                            </div>
                        </div>
                        <IonButton onClick={() => console.log("Save")} className={"saveButton"}>Speichern</IonButton>
                    </div>

                </div>
            </IonContent>
        </IonPage>
    );
}

export default UserSettings;