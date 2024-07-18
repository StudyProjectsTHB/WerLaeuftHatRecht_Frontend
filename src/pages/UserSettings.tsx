import {IonButton, IonContent, IonIcon, IonPage, IonToast} from '@ionic/react';
import React, {useEffect, useState} from "react";
import Greeting from "../components/Greeting";
import {arrowBack} from "ionicons/icons";
import {useHistory} from "react-router";
import {useLocation} from "react-router-dom";
import {checkToken, getToken, getUser} from "../util/service/loginService";
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

    const [message, setMessage] = useState<string | null>(null);
    const [toastColor, setToastColor] = useState<string | null>(null);
    const [showToast, setShowToast] = useState(false);



    const history = useHistory();
    const location = useLocation()

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
                setUserId(user.id);
                setUserStepGoal(user.stepGoal);
                setUserStepSize(user.stepSize ? user.stepSize : 0);
                setUserHeight(user.height ? user.height : 0);

                setGroup(user.group.name);

            }
        }
        fetchData();
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
            setMessage('Bitte gib nur einen Wert an');
            setToastColor('#CD7070');
            setShowToast(true);
            return;
        }
        try {
            const updatedUser = await changeUserSettings(getToken(), userId, userStepGoal, userHeight, userStepSize);
            if (updatedUser) {
                const user = getUser(getToken());
                if (user) {
                    setUserStepGoal(userStepGoal);
                    setUserHeight(userHeight);
                    setUserStepSize(userStepSize);
                }
                setMessage('Einstellungen gespeichert');
                setToastColor('#68964C');
                setShowToast(true);
            } else {
                setMessage('Einstellungen konnten nicht gespeichert werden');
                setToastColor('#CD7070');
                setShowToast(true);
            }
        } catch (error) {
            if (error instanceof TypeError) {
                setMessage('Einstellungen konnten nicht gespeichert werden');
            } else {
                setMessage(error.message);
            }
            setToastColor('#CD7070');
            setShowToast(true);
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
                <div className={"settingsExtraContainer"}>

                    <div>
                        <h2>Ziele</h2>
                        <p> Hier kannst du dein Schrittziel anpassen. </p>
                        <div className={""}>
                            <div>
                                <p className={"bold"}> Schrittziel: </p>
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
                        <p> Hier kannst du deine Größe und Schrittweite für eine genauere Distanzberechnung
                            anpassen. </p>
                        <p> Bitte beachte, dass du nur einen Wert angeben kannst. </p>
                        <div className={"flexSetting"}>
                            <div className={userStepSize > 0 ? "unactive" : ""}>
                                <p className={"bold"}> Größe: </p>
                                <input
                                    type={"number"}
                                    value={userHeight}
                                    placeholder="cm"
                                    onChange={handleHeightChange}
                                    disabled={userStepSize > 0}
                                />
                                <span>cm</span>
                            </div>

                            <div className={userHeight > 0 ? "unactive" : ""}>
                                <p className={"bold"}> Schrittweite: </p>
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

export default UserSettings;