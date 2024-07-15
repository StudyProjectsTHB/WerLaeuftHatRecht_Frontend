import React, {useEffect, useState} from 'react';
import { IonModal, IonButton, IonContent, IonHeader, IonToolbar, IonTitle } from '@ionic/react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import './StepsAddModal.css';
import {useHistory} from "react-router";
import {useLocation} from "react-router-dom";
import {checkToken, getToken, getUser} from "../../util/service/loginService";
import {changeUserEmail} from "../../util/service/userService";

const UserChangeModal = ({ isOpen, onClose, email, id}) => {
    const [loading, setLoading] = useState<boolean>(true);
    const [userAdjective, setUserAdjective] = useState<string>("");
    const [userNoun, setUserNoun] = useState<string>("");
    const [userStepGoal, setUserStepGoal] = useState<number>(0);
    const [group, setGroup] = useState<string>("");
    const [newEmail, setNewEmail] = useState<string>("");

    const history = useHistory();
    const location = useLocation();

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
        setNewEmail(email)
    }, [location, history, isOpen]);

    const handleChangeUser = async () => {
        try {
            const changed = await changeUserEmail(getToken(), id, newEmail)
            if (changed) {
                onClose();
            } else {
                alert("Fehler beim Ändern der Email")
            }
        } catch (e) {
            console.log(e)
            alert("Fehler beim Ändern der Email")
        }
    }

    return (
        <IonModal isOpen={isOpen} onDidDismiss={onClose} className={"heightSet"}>
            <IonContent>
                <div>
                    <h1>Email bearbeiten</h1>
                </div>
                <div className={"modalFlex"}>
                    <input
                        type="email"
                        defaultValue={email}
                        placeholder="Email eintragen"
                        onChange={e => setNewEmail(e.target.value)}
                    />
                </div>
                <div className={"buttonContainer"}>
                    <button slot="end" onClick={onClose} className={"secondary"}>Abbrechen</button>
                    <button onClick={handleChangeUser}>Speichern</button>
                </div>
            </IonContent>
        </IonModal>
    );
}

export default UserChangeModal;