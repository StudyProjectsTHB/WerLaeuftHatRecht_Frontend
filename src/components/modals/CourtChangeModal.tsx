import React, {useEffect, useState} from 'react';
import {IonModal, IonButton, IonContent, IonHeader, IonToolbar, IonTitle} from '@ionic/react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import './AddStepsModal.css';
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

    const history = useHistory();
    const location = useLocation();

    useEffect(() => {
        if (!checkToken()) {
            // history.push('/login', {direction: 'none'});
            window.location.assign('/login');
        }

        const token = getToken();
        const user = getUser();
        if (token && user) {
            setUserAdjective(user.adjective);
            setUserNoun(user.noun);
            setUserStepGoal(user.stepGoal)
            setGroup(user.group.name);
            setLoading(false);

            setCourtName(name);
            setCourtCount(count);
            console.log(name, count)
        }
    }, [location, history, isOpen]);

    const handleChangeCourt = async () => {
        console.log(courtName, courtCount)
        try {
            const changedCourt = await changeGroup(getToken(), id, courtName, courtCount)

            if (changedCourt) {
                onClose();
            } else {
                alert("Fehler beim Ändern des Gerichts")

            }
        } catch (e) {
            console.log(e)
            alert("Fehler beim Ändern des Gerichts")
        }
    }

    return (
        <IonModal isOpen={isOpen} onDidDismiss={onClose} className={"heightSet500"}>
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
                        />

                    </div>
                </div>

                <div className={"buttonContainer"}>
                    <button slot="end" onClick={onClose} className={"secondary"}>Abbrechen</button>
                    <button onClick={handleChangeCourt}>Speichern</button>
                </div>
            </IonContent>
        </IonModal>
    );
}

export default CourtChangeModal;