import React, {useEffect, useState} from 'react';
import {IonModal, IonContent, IonToast} from '@ionic/react';
import "react-datepicker/dist/react-datepicker.css";
import './StepsAddModal.css';
import {useHistory} from "react-router";
import {checkToken, getToken, getUser} from "../../util/service/loginService";
import {addGroup} from "../../util/service/groupService";
import {useLocation} from "react-router-dom";

const CourtAddModal = ({isOpen, onClose}) => {
    const [loading, setLoading] = useState<boolean>(true);
    const [userAdjective, setUserAdjective] = useState<string>("");
    const [userNoun, setUserNoun] = useState<string>("");
    const [userStepGoal, setUserStepGoal] = useState<number>(0);
    const [group, setGroup] = useState<string>("");

    const [courtName, setCourtName] = useState<string>("");
    const [courtCount, setCourtCount] = useState<number>(0);

    const [message, setMessage] = useState<string | null>(null);
    const [toastColor, setToastColor] = useState<string | null>(null);
    const [showToast, setShowToast] = useState(false);

    const history = useHistory();
    const location = useLocation();

    const handleEnterPress = (e) => {
        if (e.key === 'Enter') {
            handleAddCourt();
        }
    };

    useEffect(() => {
        const fetchDate = async () => {
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
                setShowToast(false);
            }
        }
        fetchDate();
    }, [location, isOpen]);

    const handleAddCourt = async () => {
        try {
            const newCourt = await addGroup(getToken(), courtName, courtCount)

            if (newCourt) {
                setCourtName("");
                setCourtCount(0);
                onClose({courtAdded: true});
            } else {
                setMessage('Gericht konnte nicht angelegt werden');
                setToastColor('#CD7070');
                setShowToast(true);
            }
        } catch (error) {
            if (error instanceof TypeError) {
                setMessage('Gericht konnte nicht angelegt werden');
            } else {
                setMessage(error.message);
            }
            setToastColor('#CD7070');
            setShowToast(true);
        }
    }

    return (
        <IonModal isOpen={isOpen} onDidDismiss={() => {
            onClose({courtAdded: false});
            setCourtName("");
            setCourtCount(0);
        }} className={"heightSet500"}>
            <IonContent>
                <h1>Neues Gericht anlegen</h1>
                <div>
                    <div>
                        <p>Namen eingeben</p>
                    </div>
                    <div className={"modalFlex"}>
                        <input
                            type="text"
                            placeholder="Namen eintragen"
                            value={courtName}
                            onChange={(e) => setCourtName(e.target.value)}
                        />
                    </div>
                </div>
                <div>
                    <div>
                        <p>Mitarbeiteranzahl eingeben</p>
                    </div>
                    <div className={"modalFlex"}>
                        <input
                            type="number"
                            placeholder="Mitarbeiteranzahl eintragen"
                            value={courtCount}
                            onChange={(e) => setCourtCount(parseInt(e.target.value))}
                            onKeyPress={handleEnterPress}
                        />
                    </div>
                </div>

                <div className={"buttonContainer"}>
                    <button slot="end" onClick={() => {
                        onClose({courtAdded: false});
                        setCourtName("");
                        setCourtCount(0);
                    }} className={"secondary"}>Abbrechen
                    </button>
                    <button onClick={handleAddCourt}>Gericht anlegen</button>
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
        </IonModal>
    );
}

export default CourtAddModal;