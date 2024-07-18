import React, {useEffect, useState} from 'react';
import {IonModal, IonContent, IonToast} from '@ionic/react';
import "react-datepicker/dist/react-datepicker.css";
import './StepsAddModal.css';
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

    const [message, setMessage] = useState<string | null>(null);
    const [toastColor, setToastColor] = useState<string | null>(null);
    const [showToast, setShowToast] = useState(false);

    const history = useHistory();


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
    }, []);

    const handleDeleteCourt = async () => {
        try {
            // const newCourt = await addGroup(getToken(), courtName, courtCount)
            const deletedCourtBool = await removeGroup(getToken(), id)

            if (deletedCourtBool) {
                onClose({courtDeleted: true});
            } else {
                setMessage('Gericht konnte nicht gelöscht werden');
                setToastColor('#CD7070');
                setShowToast(true);

            }
        } catch (error) {
            if (error instanceof TypeError) {
                setMessage('Gericht konnte nicht gelöscht werden');
            } else {
                setMessage(error.message);
            }
            setToastColor('#CD7070');
            setShowToast(true);
        }

    }



    return (
        <IonModal isOpen={isOpen} onDidDismiss={() => onClose({courtDeleted: false})} className={"heightSet"}>
            <IonContent>
                <div>
                    <h1>Sind Sie sicher, dass Sie das Gericht {name} löschen möchten?</h1>
                    <p>Das hat weitreichende Folgen: alle zugehörige Nutzer werden entfernt und das Gericht kann nicht mehr am Wettbewerb teilnehmen.</p>
                </div>

                <div className={"buttonContainer"}>
                    <button slot="end" onClick={() => onClose({courtDeleted: false})} className={"secondary"}>Abbrechen</button>
                    <button onClick={handleDeleteCourt}>Ja, Gericht löschen</button>
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