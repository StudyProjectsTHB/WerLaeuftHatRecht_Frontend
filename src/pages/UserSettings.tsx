import {IonButton, IonContent, IonIcon, IonPage} from '@ionic/react';
import React, {useEffect, useState} from "react";
import Greeting from "../components/Greeting";
import {arrowBack, arrowForwardOutline, logOutOutline, personOutline, settingsOutline} from "ionicons/icons";
import {useHistory} from "react-router";
import {useLocation} from "react-router-dom";
import {checkToken, getToken, getUser, logoutUser} from "../util/service/loginService";
import {changeUserSettings} from "../util/service/userSettingsService";

const UserSettings: React.FC = () => {
    const [loading, setLoading] = useState(true);
    const [userAdjective, setUserAdjective] = useState("");
    const [userNoun, setUserNoun] = useState("");
    const [userId, setUserId] = useState(-1);
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
            setUserId(user.id);
            setUserStepGoal(user.stepGoal);
            setUserStepSize(user.stepSize ? user.stepSize : 0);
            setUserHeight(user.height ? user.height : 0);

            setGroup(user.group.name);
            setLoading(false);
        }
    }, [location]);

    const handleHeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(e.target.value);
        if (value >= 0) {
            setUserHeight(value);
            setUserStepSize(0);
        } else {
            setUserHeight(0);
        }
    };

    const handleStepSizeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(e.target.value);
        if (value >= 0) {
            setUserStepSize(value);
            setUserHeight(0);
        } else {
            setUserStepSize(0);
        }
    };

    const handleSave = async () => {
        if (userHeight > 0 && userStepSize > 0) {
            alert("Bitte nur einen Wert angeben.");
            return;
        }
        try{
            const updatedUser = await changeUserSettings(getToken(), userId, userStepGoal, userHeight, userStepSize);
            if (updatedUser) {
                const user = getUser(getToken());
                if (user) {
                    setUserStepGoal(userStepGoal);
                    setUserHeight(userHeight);
                    setUserStepSize(userStepSize);
                }
                alert("Einstellungen gespeichert.");
            }
        } catch (error) {
            console.error(error);
            alert("Fehler beim Speichern der Einstellungen.");
        }
    }

    return (
        <IonPage className={"PageModal Edit settings"}>
            <IonContent fullscreen>
                <Greeting adjective={userAdjective} noun={userNoun} group={group}/>
                <button onClick={() => {
                    history.push("/tabs/settings")
                }} className={"buttonBack"}>
                    <IonIcon aria-hidden="true" icon={arrowBack}/>
                    <p>Zurück</p>
                </button>
                <h1>Persönliche Einstellungen</h1>
                <div className={"settingsContainer"}>

                    <div>
                        <h2>Ziele</h2>
                        <p> Hier kannst du dein Schrittziel anpassen. </p>
                        <div className={"flexSetting"}>
                            <div>
                                <p> Schrittziel: </p>
                                <input
                                    type={"number"}
                                    value={userStepGoal}
                                    onChange={(e) => {
                                        const value = parseInt(e.target.value);
                                        if (value > 0) setUserStepGoal(value);
                                    }}
                                />
                                <span> Schritte</span>
                            </div>
                        </div>
                        <h2>Größe und Schrittweite</h2>
                        <p> Hier kannst du deine Größe und Schrittweite für eine genauere Distanzberechnung anpassen. </p>
                        <p> Bitte beachte, dass du nur einen Wert angeben kannst. </p>
                        <div className={"flexSetting"}>
                            <div>
                                <p> Größe: </p>
                                <input
                                    type={"number"}
                                    value={userHeight}
                                    placeholder="cm"
                                    onChange={handleHeightChange}
                                    disabled={userStepSize > 0}
                                />
                                <span>cm</span>
                            </div>

                            <div>
                                <p> Schrittweite: </p>
                                <input
                                    type={"number"}
                                    value={userStepSize}
                                    onChange={handleStepSizeChange}
                                    disabled={userHeight > 0}
                                />
                                <span className="unit">cm</span>
                            </div>
                        </div>
                        <IonButton onClick={handleSave} className={"saveButton"}>Speichern</IonButton>
                    </div>

                </div>
            </IonContent>
        </IonPage>
    );
}

export default UserSettings;