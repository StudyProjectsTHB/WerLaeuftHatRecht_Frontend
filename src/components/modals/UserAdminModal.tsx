import React, {useEffect, useState} from 'react';
import {IonModal, IonContent, IonToast} from '@ionic/react';
import "react-datepicker/dist/react-datepicker.css";
import './StepsAddModal.css';
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
                setShowToast(false)

            }
        }
        fetchData();
    }, [location, isOpen]);

    const handleAdminUser = async () => {
        try {
            const changed = await changeUserAdmin(getToken(), id, !isAdmin)
            if (changed) {
                if (isAdmin) {
                    onClose({userNoAdmin: true});
                } else {
                    onClose({userAdmin: true});
                }
            } else {
                setMessage('Managerrechte konnten nicht geändert werden');
                setToastColor('#CD7070');
                setShowToast(true);
            }
        } catch (error) {
            if (error instanceof TypeError) {
                setMessage('Managerrechte konnten nicht geändert werden');
            } else {
                setMessage(error.message);
            }
            setToastColor('#CD7070');
            setShowToast(true);
        }

    }
    return (
        <IonModal isOpen={isOpen} onDidDismiss={() => onClose({userAdmin: false})} className={""}>
            <IonContent>
                {!isAdmin ? (
                    <>
                        <div>
                            <h1>{email} zum Admin machen?</h1>
                            <p>Administratoren können die Details aller Nutzer bearbeiten, den Wettbewerb verwalten,
                                Gerichte löschen und andere Nutzer zum Administrator machen.
                                Bitte bestätigen Sie nur, wenn der Nutzer ({email}) die Berechtigungen hierfür erhalten
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
                                Bitte bestätigen Sie nur, wenn der Nutzer ({email}) die Berechtigungen hierfür nicht mehr
                                erhalten soll!</p>
                        </div>
                        <div className={"buttonContainer"}>
                            <button slot="end" onClick={() => onClose({userAdmin: false})} className={"secondary"}>Abbrechen</button>
                            <button onClick={handleAdminUser}>Ja, nicht mehr zum Admin machen</button>
                        </div>
                    </>
                )}
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