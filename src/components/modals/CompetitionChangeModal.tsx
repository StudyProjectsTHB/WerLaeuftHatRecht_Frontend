import React, {useEffect, useState} from 'react';
import {IonModal, IonContent, IonToast} from '@ionic/react';
import "react-datepicker/dist/react-datepicker.css";
import './StepsAddModal.css';
import {checkToken, getToken, getUser} from "../../util/service/loginService";
import {useHistory} from "react-router";
import {useLocation} from "react-router-dom";
import {changeCompetition} from "../../util/service/competitionService";

const CompetitionChangeModal = ({isOpen, onClose, startDate, endDate}) => {
    const [loading, setLoading] = useState(true);
    const [userAdjective, setUserAdjective] = useState("");
    const [userNoun, setUserNoun] = useState("");
    const [userStepGoal, setUserStepGoal] = useState(0);
    const [group, setGroup] = useState("");

    const [message, setMessage] = useState<string | null>(null);
    const [toastColor, setToastColor] = useState<string | null>(null);
    const [showToast, setShowToast] = useState(false);

    const [showDatePicker, setShowDatePicker] = useState(false);

    const history = useHistory();
    const location = useLocation();

    useEffect(() => {
        const fetchDate = async () => {
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


                if (!user.admin) {
                    window.location.assign('/tabs/tab1');
                }
            }
        }
        fetchDate();
    }, [location, isOpen]);

    const handleDateChange = async () => {
        try{
            const newCompetition = await changeCompetition(getToken(), startDate, endDate);

            if (newCompetition) {
                onClose(true);
            } else {
                setMessage('Wettbewerb konnte nicht geändert werden');
                setToastColor('#CD7070');
                setShowToast(true);
            }
        } catch (error) {
            if (error instanceof TypeError) {
                setMessage('Wettbewerb konnte nicht geändert werden');
            } else {
                setMessage(error.message);
            }
            setToastColor('#CD7070');
            setShowToast(true);
        }

    }

    return (
        <IonModal isOpen={isOpen} onDidDismiss={() => onClose(false)} className={"heightSet"}>
            <IonContent>
                <div>
                    <h1>Zeitraum des Wettbewerbes wirklich ändern?</h1>
                    <p> Hierbei werden alle bereits eingetragenen Schritte aller Nutzenden gelöscht.</p>
                    {/*<p>Hierbei können bei den bisher eingetragenen Schritten Inkonsistenzen auftreten.</p>*/}
                </div>

                <div className={"buttonContainer"}>
                    <button slot="end" onClick={() => onClose(false)} className={"secondary"}>Abbrechen</button>
                    <button onClick={handleDateChange}>Ja, Zeitraum ändern</button>
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

export default CompetitionChangeModal;