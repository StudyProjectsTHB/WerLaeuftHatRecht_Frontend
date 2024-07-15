import React, {useEffect, useState} from 'react';
import {IonModal, IonButton, IonContent, IonHeader, IonToolbar, IonTitle} from '@ionic/react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import './AddStepsModal.css';
import {useHistory} from "react-router";
import {useLocation} from "react-router-dom";
import {checkToken, getToken, getUser} from "../../util/service/loginService";
import {changeUserAdmin} from "../../util/service/userService";

const CourtDeleteModal = ({isOpen, onClose, email, id, isAdmin}) => {
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

    const handleAdminUser = async () => {
        try {
            const changed = await changeUserAdmin(getToken(), id, !isAdmin)
            if (changed) {
                onClose();
            } else {
                alert("Fehler beim Ändern der Adminrechte")
            }
        } catch (e) {
            console.log(e)
            alert("Fehler beim Ändern der Adminrechte")
        }

    }
    return (
        <IonModal isOpen={isOpen} onDidDismiss={onClose} className={"heightSet"}>
            <IonContent>
                {!isAdmin ? (
                    <>
                        <div>
                            <h1>{email} zum Admin machen?</h1>
                            <p>Administratoren können die Details aller Nutzer bearbeiten, den Wettbewerb verwalten,
                                Gerichte löschen und andere Nutzer zum Administrator machen.
                                Bitte bestätigen Sie nur, wenn der Nutzende ({email}) die Berechtigungen hierfür erhalten
                                soll!</p>
                        </div>
                        <div className={"buttonContainer"}>
                            <button slot="end" onClick={onClose} className={"secondary"}>Abbrechen</button>
                            <button onClick={handleAdminUser}>Ja, zum Admin machen</button>
                        </div>
                    </>
                ) : (
                    <>
                        <div>
                            <h1>{email} nicht mehr zum Admin machen?</h1>
                            <p>Administratoren können die Details aller Nutzer bearbeiten, den Wettbewerb verwalten,
                                Gerichte löschen und andere Nutzer zum Administrator machen.
                                Bitte bestätigen Sie nur, wenn der Nutzende ({email}) die Berechtigungen hierfür nicht mehr
                                erhalten soll!</p>
                        </div>
                        <div className={"buttonContainer"}>
                            <button slot="end" onClick={onClose} className={"secondary"}>Abbrechen</button>
                            <button onClick={handleAdminUser}>Nein, nicht mehr zum Admin machen</button>
                        </div>
                    </>
                )}
            </IonContent>
        </IonModal>
    );
}

export default CourtDeleteModal;