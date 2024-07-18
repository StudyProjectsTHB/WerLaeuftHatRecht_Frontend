import React, {useEffect, useRef, useState} from 'react';
import {IonModal, IonContent, IonToast} from '@ionic/react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import './StepsAddModal.css';
import {checkToken, getToken, getUser} from "../../util/service/loginService";
import {useHistory} from "react-router";
import {addSteps, deleteSteps} from "../../util/service/addStepsService";
import de from 'date-fns/locale/de';
import {registerLocale, setDefaultLocale} from 'react-datepicker';
import {formatDate} from "../../util/service/util";
import {AddStepsModalProps} from "../../types";
// import StepsDeleteModal from "./StepsDeleteModal";

const StepsAddModal = ({isOpen, onClose, date}: AddStepsModalProps) => {
    const [loading, setLoading] = useState<boolean>(true);
    const [userAdjective, setUserAdjective] = useState<string>("");
    const [userNoun, setUserNoun] = useState<string>("");
    const [userStepGoal, setUserStepGoal] = useState<number>(0);
    const [group, setGroup] = useState<string>("");

    const [startDate, setStartDate] = useState<Date>(new Date());
    const [endDate, setEndDate] = useState<Date>(new Date());
    const [showDatePicker, setShowDatePicker] = useState<boolean>(false);
    const datepickerRef = useRef(null);
    const [enteredSteps, setEnteredSteps] = useState<number | string>("");

    const [message, setMessage] = useState<string | null>(null);
    const [toastColor, setToastColor] = useState<string | null>(null);
    const [showToast, setShowToast] = useState(false);

    const history = useHistory();

    registerLocale('de', de);
    setDefaultLocale('de');

    const handleDateChange = (dates: [Date, Date]): void => {
        const [start, end] = dates;
        setStartDate(start);
        setEndDate(end);
    };

    // const handleOpenDeleteModal = () => {
    //     console.log("Opening Delete Modal");
    //     setShowDeleteModal(true);
    // };

    const toggleDatePicker = () => {
        setShowDatePicker(!showDatePicker);
    };

    const handleEnterPress = (e) => {
        if (e.key === 'Enter') {
            handleAddSteps();
        }
    };

    useEffect(() => {
        const fetchData = async () => {
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
                setShowToast(false);
            }
        }
        fetchData();
    }, [isOpen]);

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
        try {
            const stepDays = await addSteps(getToken(), enteredSteps, formatDate(startDate), formatDate(endDate));
            if (stepDays) {
                setEnteredSteps("");
                setStartDate(new Date());
                setEndDate(new Date());
                onClose(true);
            } else {
                setMessage('Schritte konnten nicht erfasst werden');
                setToastColor('#CD7070');
                setShowToast(true);
            }
        } catch (error) {
            if (error instanceof TypeError) {
                setMessage('Schritte konnten nicht gelöscht werden');
            } else {
                setMessage(error.message);
            }
            setToastColor('#CD7070');
            setShowToast(true);
        }
    };

    const handleDeleteSteps = async () => {
        try {
            const isDeleted = await deleteSteps(getToken(), formatDate(startDate), formatDate(endDate));
            if (isDeleted) {
                setMessage('Schritte gelöscht');
                setToastColor('#68964C');
                setShowToast(true);
            } else {
                setMessage('Schritte konnten nicht gelöscht werden');
                setToastColor('#CD7070');
                setShowToast(true);
            }
        } catch (error) {
            if (error instanceof TypeError) {
                setMessage('Schritte konnten nicht gelöscht werden');
            } else {
                setMessage(error.message);
            }
            setToastColor('#CD7070');
            setShowToast(true);
        }
    }


    return (
        <IonModal isOpen={isOpen} onDidDismiss={() => {
            onClose(false);
            setEnteredSteps("");
            setStartDate(new Date());
            setEndDate(new Date());
        }}>
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
                            value={enteredSteps}
                            onChange={e => {
                                if (parseInt(e.target.value) >= 0) {
                                    setEnteredSteps(parseInt(e.target.value))
                                } else if (e.target.value === "") {
                                    setEnteredSteps(0)
                                }
                            }}
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
                                    : startDate && !endDate
                                        ? `${startDate.toLocaleDateString()} - `
                                        : "Zeitraum auswählen"
                            }
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
                        <button slot="end" onClick={() => {
                            onClose(false);
                            setEnteredSteps("");
                            setStartDate(new Date());
                            setEndDate(new Date());
                        }} className={"secondary"}>Abbrechen
                        </button>
                        <button onClick={handleAddSteps}>Schritte erfassen</button>
                    </div>
                    <button style={{backgroundColor: '#d8d8d8', color: '#000', border: 'none'}}
                            onClick={handleDeleteSteps}>
                        Schritte löschen
                    </button>
                </div>
            </IonContent>
            {/*<StepsDeleteModal isOpen={showDeleteModal} onClose={() => setShowDeleteModal(false)} startDate={startDate} endDate={endDate} id={0} />*/}
            <IonToast
                isOpen={showToast}
                onDidDismiss={() => setShowToast(false)}
                message={message}
                duration={3000}
                // className={"loggin-toast"}
                cssClass="toast"
                style={{
                    '--toast-background': toastColor
                }}
            />
        </IonModal>
    );
};

export default StepsAddModal;
