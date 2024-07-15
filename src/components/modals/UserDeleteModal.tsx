import React, {useEffect, useState} from 'react';
import {IonModal, IonContent} from '@ionic/react';
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
    }, [location, history, isOpen]);

    const handleDeleteUser = async () => {
        try {
            const deleted = await removeUser( getToken(), id)

            if (deleted) {
                onClose();
            } else {
                alert("Fehler beim Löschen des Nutzenden")

            }
        } catch (e) {
            console.log(e)
            alert("Fehler beim Löschen des Nutzenden")
        }
    }

    return (
        <IonModal isOpen={isOpen} onDidDismiss={onClose} className={"heightSet"}>
            <IonContent>
                <div>
                    <h1>Sind Sie sicher, dass Sie den Nutzenden {email} löschen möchten?</h1>
                    <p>Dadurch verliert der Nutzende alle Berechtigungen und seinen Zugang zum
                        Schrittzählerwettbewerb.</p>
                </div>

                <div className={"buttonContainer"}>
                    <button slot="end" onClick={onClose} className={"secondary"}>Abbrechen</button>
                    <button onClick={handleDeleteUser}>Ja, Nutzenden löschen</button>
                </div>
            </IonContent>
        </IonModal>
    );
}

export default CourtDeleteModal;