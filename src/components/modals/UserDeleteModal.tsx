import React, {useEffect, useState} from 'react';
import {IonModal, IonContent, IonToast} from '@ionic/react';
import "react-datepicker/dist/react-datepicker.css";
import './StepsAddModal.css';
import {useHistory} from "react-router";
import {useLocation} from "react-router-dom";
import {checkToken, getToken, getUser} from "../../util/service/loginService";
import {removeUser} from "../../util/service/userService";

const CourtDeleteModal = ({isOpen, onClose, email, id}) => {
    const [loading, setLoading] = useState<boolean>(true);
    const [userAdjective, setUserAdjective] = useState<string>("");
    const [userNoun, setUserNoun] = useState<string>("");
    const [userStepGoal, setUserStepGoal] = useState<number>(0);
    const [group, setGroup] = useState<string>("");

    const [message, setMessage] = useState<string | null>(null);
    const [toastColor, setToastColor] = useState<string | null>(null);
    const [showToast, setShowToast] = useState(false);

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
                setShowToast(false);
            }
        }
        fetchData();
    }, [location, isOpen]);

    const handleDeleteUser = async () => {
        try {
            const deleted = await removeUser(getToken(), id)

            if (deleted) {
                setMessage('Nutzer gelöscht');
                setToastColor('#68964C');
                setShowToast(true);
                onClose({userDeleted: true});
            } else {
                setMessage('Nutzer konnte nicht gelöscht werden');
                setToastColor('#CD7070');
                setShowToast(true);
            }
        } catch (error) {
            if (error instanceof TypeError) {
                setMessage('Nutzer konnte nicht gelöscht werden');
            } else {
                setMessage(error.message);
            }
            setToastColor('#CD7070');
            setShowToast(true);
        }
    }

    return (
        <IonModal isOpen={isOpen} onDidDismiss={() => onClose({userDeleted: false})} className={"heightSet"}>
            <IonContent>
                <div>
                    <h1>Sind Sie sicher, dass Sie den Nutzer {email} löschen möchten?</h1>
                    <p>Dadurch verliert der Nutzer alle Berechtigungen und seinen Zugang zum
                        Schrittzählerwettbewerb.</p>
                </div>

                <div className={"buttonContainer"}>
                    <button slot="end" onClick={() => onClose({userDeleted: false})} className={"secondary"}>Abbrechen</button>
                    <button onClick={handleDeleteUser}>Ja, Nutzer löschen</button>
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

export default CourtDeleteModal;