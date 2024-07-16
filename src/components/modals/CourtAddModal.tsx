import React, {useEffect, useState} from 'react';
import {IonModal, IonContent} from '@ionic/react';
import "react-datepicker/dist/react-datepicker.css";
import './StepsAddModal.css';
import {useHistory} from "react-router";
import {checkToken, getToken, getUser} from "../../util/service/loginService";
import {addGroup} from "../../util/service/groupService";
import {useLocation} from "react-router-dom";

const CourtAddModal = ({isOpen, onClose}) => {
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
        const user = getUser(token);
        if (token && user) {
            setUserAdjective(user.adjective);
            setUserNoun(user.noun);
            setUserStepGoal(user.stepGoal)
            setGroup(user.group.name);
            setLoading(false);
        }
    }, [location, history, isOpen]);

    const handleAddCourt = async () => {
        try {
            const newCourt = await addGroup(getToken(), courtName, courtCount)

            if (newCourt) {
                onClose();
            } else {
                alert("Fehler beim Anlegen des Gerichts")

            }
        } catch (e) {
            console.log(e)
            alert("Fehler beim Anlegen des Gerichts")
        }
    }

    return (
        <IonModal isOpen={isOpen} onDidDismiss={onClose} className={"heightSet500"}>
            <IonContent>
                <h1>Neues Gericht anlegen</h1>
                <div>
                    <div>
                        <p>Namen eingeben</p>
                    </div>
                    <div className={"modalFlex"}>
                        <input
                            type="text"
                            placeholder="Namen eintragen"
                            value={courtName}
                            onChange={(e) => setCourtName(e.target.value)}
                        />
                    </div>
                </div>
                <div>
                    <div>
                        <p>Mitarbeiteranzahl eingeben</p>
                    </div>
                    <div className={"modalFlex"}>
                        <input
                            type="number"
                            placeholder="Mitarbeiteranzahl eintragen"
                            value={courtCount}
                            onChange={(e) => setCourtCount(parseInt(e.target.value))}
                        />
                    </div>
                </div>

                <div className={"buttonContainer"}>
                    <button slot="end" onClick={onClose} className={"secondary"}>Abbrechen</button>
                    <button onClick={handleAddCourt}>Gericht anlegen</button>
                </div>
            </IonContent>
        </IonModal>
    );
}

export default CourtAddModal;