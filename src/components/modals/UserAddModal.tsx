import React, {useEffect, useState} from 'react';
import {
    IonModal,
    IonContent
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


    const [selectedCourt, setSelectedCourt] = useState<number>(0);

    const [email, setEmail] = useState("");


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

            setSelectedCourt(courtsIds[0])
        }

    }, [location, history, isOpen]);

    const handleAddUser = async () => {
        try {
            const newUserToken = await createUser(getToken(), email, false, selectedCourt)
            if (newUserToken) {
                setSelectedCourt(courtsIds[0])
                setEmail("")
                onClose();
            } else {
                alert("Nutzer konnte nicht hinzugefügt werden")
            }
        } catch (e) {
            console.log(e)
            alert("Nutzer konnte nicht hinzugefügt werden")
        }

    }


    return (
        <IonModal isOpen={isOpen} onDidDismiss={onClose} className={"heightSet500"}>
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
                    />
                </div>
                <div>
                    <p>Gericht eintragen</p>
                    <select
                        value={selectedCourt}
                        onChange={e => setSelectedCourt(parseFloat(e.target.value))}
                    >
                        {courtsNames.map((court) => {
                            return <option key={courtsNames.indexOf(court)}
                                           value={courtsIds[courtsNames.indexOf(court)]}>{court}</option>
                        })}


                    </select>
                </div>

                <div className={"buttonContainer"}>
                    <button slot="end" onClick={onClose} className={"secondary"}>Abbrechen</button>
                    <button onClick={handleAddUser} className={"primary"}>Speichern</button>
                </div>

            </IonContent>
        </IonModal>
    );
}

export default UserAddModal;