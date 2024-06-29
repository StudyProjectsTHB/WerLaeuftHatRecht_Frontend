// AddStepsModal.jsx
import React, {useEffect, useRef, useState} from 'react';
import {IonModal, IonButton, IonContent, IonHeader, IonToolbar, IonTitle} from '@ionic/react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import './AddStepsModal.css';

const AddStepsModal = ({isOpen, onClose}) => {
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);
    const datepickerRef = useRef(null);


    const handleDateChange = (dates) => {
        const [start, end] = dates;
        setStartDate(start);
        setEndDate(end);
    };

    const toggleDatePicker = () => {
        setShowDatePicker(!showDatePicker);
    };

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
                        <input type="number" placeholder="Schritte eintragen"/>
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
                                />
                            </div>
                        )}
                    </div>
                    <div className={"buttonContainer"}>
                        <button slot="end" onClick={onClose} className={"secondary"}>Abbrechen</button>
                        <button onClick={onClose}>Schritte erfassen</button>
                    </div>
                </div>
            </IonContent>
        </IonModal>
    );
};

export default AddStepsModal;
