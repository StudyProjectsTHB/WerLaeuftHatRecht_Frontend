import React, {useEffect, useState} from 'react';
import {IonModal, IonContent} from '@ionic/react';
import {useHistory} from "react-router";
import {useLocation} from "react-router-dom";
import {checkToken, getToken, getUser} from "../../util/service/loginService";

const StepsDeleteModal = ({isOpen, onClose, startDate, endDate, id}) => {
    const [loading, setLoading] = useState<boolean>(true);
    const [userAdjective, setUserAdjective] = useState<string>("");
    const [userNoun, setUserNoun] = useState<string>("");
    const [userStepGoal, setUserStepGoal] = useState<number>(0);
    const [group, setGroup] = useState<string>("");
    const dateSame = (!startDate ? null : startDate.getTime()) === (!endDate ? null : endDate.getTime());

    const history = useHistory();
    const location = useLocation();

    useEffect(() => {
        if (!checkToken()) {
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
    }, [location, isOpen]);

    const handleDeleteSteps = async () => {
        console.log("Deleting steps"); // Debug log
        onClose();
    };

    return (
        <IonModal isOpen={isOpen} onDidDismiss={onClose} className={"heightSet"}>
            <IonContent>
                <div>
                    {dateSame ? (
                        <>
                            <h1>Sind Sie sicher, dass Sie alle Schritte
                                am {!startDate ? null : startDate.toLocaleDateString()} löschen möchten?</h1>
                            <p>Dadurch verlieren Sie ihren gesamten Fortschritt an diesem Tag.</p>
                        </>
                    ) : (
                        <>
                            <h1>Sind Sie sicher, dass Sie alle Schritte
                                im Zeitraum {!startDate ? null : startDate.toLocaleDateString()} - {!endDate ? null : endDate.toLocaleDateString()} löschen
                                möchten?
                            </h1>
                            <p>Dadurch verlieren Sie ihren gesamten Fortschritt in diesem Zeitraum.</p>
                        </>
                    )}

                </div>

                <div className={"buttonContainer"}>
                    <button slot="end" onClick={onClose} className={"secondary"}>Abbrechen</button>
                    <button onClick={handleDeleteSteps}>Ja, Schritte löschen</button>
                </div>
            </IonContent>
        </IonModal>
    );
}

export default StepsDeleteModal;
