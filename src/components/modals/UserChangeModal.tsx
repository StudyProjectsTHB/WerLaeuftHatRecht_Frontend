import React, {useEffect, useState} from 'react';
import {IonModal, IonContent, IonToast} from '@ionic/react';
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

    const [message, setMessage] = useState<string | null>(null);
    const [toastColor, setToastColor] = useState<string | null>(null);
    const [showToast, setShowToast] = useState(false);

    const history = useHistory();
    const location = useLocation();

    const handleEnterPress = (e) => {
        if (e.key === 'Enter') {
            handleChangeUser();
        }
    };

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
                setShowToast(false);
            }
            setNewEmail(email)
        }
        fetchData();
    }, [location, isOpen]);

    const handleChangeUser = async () => {
        try {
            const changed = await changeUserEmail(getToken(), id, newEmail)
            if (changed) {
                setMessage('Email geändert');
                setToastColor('#68964C');
                setShowToast(true);
                onClose({userChanged: true});
            } else {
                setMessage('Email konnte nicht geändert werden');
                setToastColor('#CD7070');
                setShowToast(true);
            }
        } catch (error) {
            if (error instanceof TypeError) {
                setMessage('Email konnte nicht geändert werden');
            } else {
                setMessage(error.message);
            }
            setToastColor('#CD7070');
            setShowToast(true);
        }
    }

    return (
        <IonModal isOpen={isOpen} onDidDismiss={() => onClose({userChanged: false})} className={"heightSet"}>
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
                        onKeyPress={handleEnterPress}
                    />
                </div>
                <div className={"buttonContainer"}>
                    <button slot="end" onClick={() => onClose({userChanged: false})} className={"secondary"}>Abbrechen</button>
                    <button onClick={handleChangeUser}>Speichern</button>
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

export default UserChangeModal;