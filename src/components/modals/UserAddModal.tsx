import React, {useEffect, useState} from 'react';
import {
    IonModal,
    IonContent, IonToast
} from '@ionic/react';
import "react-datepicker/dist/react-datepicker.css";
import './StepsAddModal.css';
import {useHistory} from "react-router";
import {useLocation} from "react-router-dom";
import {checkToken, getToken, getUser} from "../../util/service/loginService";
import {createUser} from "../../util/service/userService";

const UserAddModal = ({isOpen, onClose, courtsNames, courtsIds}) => {
    const [loading, setLoading] = useState<boolean>(true);
    const [userAdjective, setUserAdjective] = useState<string>("");
    const [userNoun, setUserNoun] = useState<string>("");
    const [userStepGoal, setUserStepGoal] = useState<number>(0);
    const [group, setGroup] = useState<string>("");

    const [selectedCourt, setSelectedCourt] = useState<string>("");
    const [email, setEmail] = useState("");

    const [message, setMessage] = useState<string | null>(null);
    const [toastColor, setToastColor] = useState<string | null>(null);
    const [showToast, setShowToast] = useState(false);

    const history = useHistory();
    const location = useLocation();

    const handleEnterPress = (e) => {
        if (e.key === 'Enter') {
            handleAddUser();
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
                setSelectedCourt(courtsIds[0]);
                setShowToast(false);
            }
        }
        fetchData();

    }, [location, isOpen]);

    const handleAddUser = async () => {
        try {
            const newUserToken = await createUser(getToken(), email, false, selectedCourt)
            if (newUserToken) {
                setSelectedCourt(courtsIds[0])
                setEmail("")
                onClose({userAdded: true});
            } else {
                setMessage('Nutzer konnte nicht hinzugefügt werden');
                setToastColor('#CD7070');
                setShowToast(true);
            }
        } catch (error) {
            if (error instanceof TypeError) {
                setMessage('Nutzer konnte nicht hinzugefügt werden');
            } else {
                setMessage(error.message);
            }
            setToastColor('#CD7070');
            setShowToast(true);
        }

    }


    return (
        <IonModal isOpen={isOpen} onDidDismiss={() => {
            onClose({userAdded: false});
            setSelectedCourt(courtsIds[0]);
            setEmail("")
        }} className={"heightSet500"}>
            <IonContent>
                <div>
                    <h1>Nutzer hinzufügen</h1>
                </div>
                <div>
                    <p>Email eintragen</p>
                    <input
                        type="email"
                        placeholder="Email eintragen"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        onKeyPress={handleEnterPress}
                    />
                </div>
                <div>
                    <p>Gericht eintragen</p>
                    <select
                        value={selectedCourt}
                        onChange={e => setSelectedCourt(e.target.value)}
                    >
                        {courtsNames.map((court) => {
                            return <option key={courtsNames.indexOf(court)}
                                           value={courtsIds[courtsNames.indexOf(court)]}>{court}</option>
                        })}


                    </select>
                </div>

                <div className={"buttonContainer"}>
                    <button slot="end" onClick={() => {
                        onClose({userAdded: false});
                        setSelectedCourt(courtsIds[0]);
                        setEmail("")
                    }} className={"secondary"}>Abbrechen
                    </button>
                    <button onClick={handleAddUser} className={"primary"}>Speichern</button>
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

export default UserAddModal;