// AddStepsModal.jsx
import React, {useState} from 'react';
import { IonModal, IonButton, IonContent, IonHeader, IonToolbar, IonTitle } from '@ionic/react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import './AddStepsModal.css';

const AddStepsModal = ({ isOpen, onClose }) => {
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);

    const handleDateChange = (dates) => {
        const [start, end] = dates;
        setStartDate(start);
        setEndDate(end);
    };

    const toggleDatePicker = () => {
        setShowDatePicker(!showDatePicker);
    };

    return (
        <IonModal isOpen={isOpen} onDidDismiss={onClose}>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Schritte eintragen</IonTitle>

                </IonToolbar>
            </IonHeader>
            <IonContent>
                <div className={'modal-text'}>
                        <p>Die insgesamte Strecke und die Platzierung wird im Anschluss berechnet.</p>
                </div>
                <div style={{ padding: '20px' }}>
                    <div>
                        <label>Schritte:</label>
                        <input type="number" placeholder="24.000" />
                    </div>
                    <div>
                        <label>Zeitraum:</label>
                        <div className="date-input" onClick={toggleDatePicker}>
                            {startDate && endDate ? `${startDate.toLocaleDateString()} - ${endDate.toLocaleDateString()}` : 'Zeitraum auswählen'}
                        </div>
                        {showDatePicker && (
                            <div className="datepicker-container">
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
                    <IonButton slot="end" onClick={onClose}>Abbrechen</IonButton>
                    <IonButton onClick={onClose}>Schritte erfassen</IonButton>
                </div>
            </IonContent>
        </IonModal>
    );
};

export default AddStepsModal;
