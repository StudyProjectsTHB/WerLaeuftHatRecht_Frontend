import React, {useEffect, useState} from 'react';
import {IonModal, IonButton, IonContent, IonHeader, IonToolbar, IonTitle} from '@ionic/react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import './AddStepsModal.css';
import {checkToken, getToken, getUser} from "../../util/service/loginService";
import {location} from "ionicons/icons";
import {useHistory} from "react-router";
import {useLocation} from "react-router-dom";
import {changeCompetition} from "../../util/service/competitionService";

const CompetitionChangeModal = ({isOpen, onClose, startDate, endDate}) => {
    const [loading, setLoading] = useState(true);
    const [userAdjective, setUserAdjective] = useState("");
    const [userNoun, setUserNoun] = useState("");
    const [userStepGoal, setUserStepGoal] = useState(0);
    const [group, setGroup] = useState("");

    // const [startDate, setStartDate] = useState(new Date());
    // const [endDate, setEndDate] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);

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

            if (!user.admin) {
                window.location.assign('/tabs/tab1');
            }
        }
    }, [location, history, isOpen]);

    const handleDateChange = async () => {
        try{
            const newCompetition = await changeCompetition(getToken(), startDate, endDate);

            if (newCompetition) {
                onClose();
            } else {
                alert("Fehler beim Ändern des Wettbewerbes")
            }
        } catch (e) {
            alert("Fehler beim Ändern des Wettbewerbes")
            console.log(e)
        }

    }

    return (
        <IonModal isOpen={isOpen} onDidDismiss={onClose} className={"heightSet"}>
            <IonContent>
                <div>
                    <h1>Zeitraum des Wettbewerbes wirklich ändern?</h1>
                    {/*<p> Hierbei werden alle bereits eingetragenen Schritte gelöscht.</p>*/}
                    <p>Hierbei können bei den bisher eingetragenen Schritten Inkonsistenzen auftreten.</p>
                </div>

                <div className={"buttonContainer"}>
                    <button slot="end" onClick={onClose} className={"secondary"}>Abbrechen</button>
                    <button onClick={handleDateChange}>Ja, Zeitraum ändern</button>
                </div>
            </IonContent>
        </IonModal>
    );
}

export default CompetitionChangeModal;