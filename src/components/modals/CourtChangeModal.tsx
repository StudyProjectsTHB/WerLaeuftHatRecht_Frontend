import React, {useEffect, useState} from 'react';
import {IonModal, IonContent, IonToast} from '@ionic/react';
import "react-datepicker/dist/react-datepicker.css";
import './StepsAddModal.css';
import {checkToken, getToken, getUser} from "../../util/service/loginService";
import {useHistory} from "react-router";
import {changeGroup} from "../../util/service/groupService";
import {useLocation} from "react-router-dom";

const CourtChangeModal = ({isOpen, onClose, name, id, count}) => {
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
            handleChangeCourt();
        }
    };

    useEffect(() => {
        const fecthData = async () => {
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
                setCourtName(name);
                setCourtCount(count);
                setShowToast(false);
            }
        }
        fecthData();
    }, [location, isOpen]);

    const handleChangeCourt = async () => {
        try {
            const changedCourt = await changeGroup(getToken(), id, courtName, courtCount)

            if (changedCourt) {
                onClose({courtChanged: true});
            } else {
                setMessage('Gericht konnte nicht geändert werden');
                setToastColor('#CD7070');
                setShowToast(true);
            }
        } catch (error) {
            if (error instanceof TypeError) {
                setMessage('Gericht konnte nicht geändert werden');
            } else {
                setMessage(error.message);
            }
            setToastColor('#CD7070');
            setShowToast(true);
        }
    }

    return (
        <IonModal isOpen={isOpen} onDidDismiss={() => onClose({courtChanged: false})} className={"heightSet500"}>
            <IonContent>
                <h1>Gericht bearbeiten</h1>
                <div>
                    <div>
                        <p>Namen bearbeiten</p>
                    </div>
                    <div className={"modalFlex"}>
                        <input
                            type="text"
                            defaultValue={name}
                            placeholder="Namen eintragen"
                            onChange={e => setCourtName(e.target.value)}
                        />

                    </div>
                </div>
                <div>
                    <div>
                        <p>Mitarbeiteranzahl bearbeiten</p>
                    </div>
                    <div className={"modalFlex"}>
                        <input
                            type="number"
                            defaultValue={count}
                            placeholder="Mitarbeiteranzahl eintragen"
                            onChange={e => setCourtCount(parseInt(e.target.value))}
                            onKeyPress={handleEnterPress}
                        />

                    </div>
                </div>

                <div className={"buttonContainer"}>
                    <button slot="end" onClick={() => onClose({courtChanged: false})} className={"secondary"}>Abbrechen</button>
                    <button onClick={handleChangeCourt}>Speichern</button>
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

export default CourtChangeModal;