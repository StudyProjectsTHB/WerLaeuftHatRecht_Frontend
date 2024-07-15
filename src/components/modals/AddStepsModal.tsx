// AddStepsModal.jsx
import React, {useEffect, useRef, useState} from 'react';
import {IonModal, IonButton, IonContent, IonHeader, IonToolbar, IonTitle} from '@ionic/react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import './AddStepsModal.css';
import {AddStepsModalProps} from "../types";
import {checkToken, getToken, getUser} from "../../util/service/loginService";
import {useHistory} from "react-router";
import {addSteps} from "../../util/service/addStepsService";
import de from 'date-fns/locale/de';
import { registerLocale, setDefaultLocale } from 'react-datepicker';

const AddStepsModal = ({ isOpen, onClose, date }: AddStepsModalProps) => {
    const [loading, setLoading] = useState<boolean>(true);
    const [userAdjective, setUserAdjective] = useState<string>("");
    const [userNoun, setUserNoun] = useState<string>("");
    const [userStepGoal, setUserStepGoal] = useState<number>(0);
    const [group, setGroup] = useState<string>("");

    const [startDate, setStartDate] = useState<Date>(new Date());
    const [endDate, setEndDate] = useState<Date>(new Date());
    const [showDatePicker, setShowDatePicker] = useState<boolean>(false);
    const datepickerRef = useRef(null);
    const [enteredSteps, setEnteredSteps] = useState<number>(0);

    const history = useHistory();

    registerLocale('de', de);
    setDefaultLocale('de');


    const handleDateChange = (dates: [Date, Date]): void => {
        const [start, end] = dates;
        setStartDate(start);
        setEndDate(end);
    };

    const toggleDatePicker = () => {
        setShowDatePicker(!showDatePicker);
    };

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
    }, [history, isOpen]);

    useEffect(() => {
        setStartDate(new Date(date));
        setEndDate(new Date(date));
    }, [date]);

    useEffect(() => {
        const handleOutsideClick = (event) => {
            if (datepickerRef.current && !datepickerRef.current.contains(event.target)) {
                setShowDatePicker(false);
            }
        };

        if (showDatePicker) {
            document.addEventListener('mousedown', handleOutsideClick);
        } else {
            document.removeEventListener('mousedown', handleOutsideClick);
        }

        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        };
    }, [showDatePicker]);

    const handleAddSteps = async () => {
        if (enteredSteps <= 0 || isNaN(enteredSteps)) {
            alert("Bitte gib eine gültige Anzahl an Schritten ein.");
            return;
        }
        try {
            const stepDays = await addSteps(getToken(), enteredSteps, startDate.toISOString().split('T')[0], endDate.toISOString().split('T')[0]);
            if (stepDays) {
                onClose();
            } else {
                alert("Fehler beim Hinzufügen der Schritte")
            }
        }
        catch (e) {
            console.log(e)
            alert("Fehler beim Hinzufügen der Schritte")
        }
    }

    const handleEnterPress = (e) => {
        if (e.key === 'Enter') {
            handleAddSteps();
        }
    }

    return (
        <IonModal isOpen={isOpen} onDidDismiss={onClose}>
            <IonContent>
                <h1>Schritte eintragen</h1>
                <div className={'modal-text'}>
                    <p>Die insgesamte Strecke und die Platzierung wird im Anschluss berechnet.</p>
                </div>
                <div>
                    <div className={"modalFlex"}>
                        <label>Schritte:</label>
                        <input
                            type="number"
                            placeholder="Schritte eintragen"
                            onChange={e => setEnteredSteps(parseInt(e.target.value))}
                            onKeyPress={handleEnterPress}
                        />
                    </div>
                    <div className={"modalFlex"}>
                        <label>Zeitraum:</label>
                        <div className="date-input" onClick={toggleDatePicker}>
                            {startDate && endDate && startDate.getTime() === endDate.getTime()
                                ? `${startDate.toLocaleDateString()}`
                                : startDate && endDate
                                    ? `${startDate.toLocaleDateString()} - ${endDate.toLocaleDateString()}`
                                    : 'Zeitraum auswählen'}
                        </div>
                        {showDatePicker && (
                            <div className="datepicker-container" ref={datepickerRef}>
                                <DatePicker
                                    selected={startDate}
                                    onChange={handleDateChange}
                                    startDate={startDate}
                                    endDate={endDate}
                                    selectsRange
                                    inline
                                    onCalendarClose={() => setShowDatePicker(false)}
                                    locale={"de"}
                                />
                            </div>
                        )}
                    </div>
                    <div className={"buttonContainer"}>
                        <button slot="end" onClick={onClose} className={"secondary"}>Abbrechen</button>
                        <button onClick={handleAddSteps}>Schritte erfassen</button>
                    </div>
                </div>
            </IonContent>
        </IonModal>
    );
};

export default AddStepsModal;
