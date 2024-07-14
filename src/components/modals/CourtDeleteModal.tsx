import React, {useEffect, useState} from 'react';
import {IonModal, IonButton, IonContent, IonHeader, IonToolbar, IonTitle} from '@ionic/react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import './AddStepsModal.css';
import {useHistory} from "react-router";
import {checkToken, getToken, getUser} from "../../util/service/loginService";
import {removeGroup} from "../../util/service/groupService";

const CourtDeleteModal = ({isOpen, onClose, name, id}) => {
    const [loading, setLoading] = useState<boolean>(true);
    const [userAdjective, setUserAdjective] = useState<string>("");
    const [userNoun, setUserNoun] = useState<string>("");
    const [userStepGoal, setUserStepGoal] = useState<number>(0);
    const [group, setGroup] = useState<string>("");

    const [courtName, setCourtName] = useState<string>("");
    const [courtCount, setCourtCount] = useState<number>(0);

    const history = useHistory();

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
        }
    }, [history]);

    const handleDeleteCourt = async () => {
        console.log(name, id)
        try {
            // const newCourt = await addGroup(getToken(), courtName, courtCount)
            const deletedCourtBool = await removeGroup(getToken(), id)

            if (deletedCourtBool) {
                onClose();
            } else {
                alert("Fehler beim Löschen des Gerichts")

            }
        } catch (e) {
            console.log(e)
            alert("Fehler beim Löschen des Gerichts")
        }

    }



    return (
        <IonModal isOpen={isOpen} onDidDismiss={onClose} className={"heightSet"}>
            <IonContent>
                <div>
                    <h1>Sind Sie sicher, dass Sie das Gericht {name} löschen möchten?</h1>
                    <p>Das hat weitreichende Folgen: alle zugehörige Nutzer werden entfernt und das Gericht kann nicht mehr am Wettbewerb teilnehmen.</p>
                </div>

                <div className={"buttonContainer"}>
                    <button slot="end" onClick={onClose} className={"secondary"}>Abbrechen</button>
                    <button onClick={handleDeleteCourt}>Ja, Gericht löschen</button>
                </div>
            </IonContent>
        </IonModal>
    );
}

export default CourtDeleteModal;