import React, {useState} from 'react';
import {IonModal, IonButton, IonContent, IonHeader, IonToolbar, IonTitle} from '@ionic/react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import './AddStepsModal.css';

const CourtChangeModal = ({isOpen, onClose}) => {
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);

    return (
        <IonModal isOpen={isOpen} onDidDismiss={onClose} className={"heightSet"}>
            <IonContent>
                <div>
                    <h1>Zeitraum des Wettbewerbes ändern?</h1>
                    <p>Hierbei können bei den bisher eingetragenen Schritten Inkonsistenzen auftreten.</p>
                </div>

                <div className={"buttonContainer"}>
                    <button slot="end" onClick={onClose} className={"secondary"}>Abbrechen</button>
                    <button onClick={onClose}>Ja, Zeitraum ändern</button>
                </div>
            </IonContent>
        </IonModal>
    );
}

export default CourtChangeModal;