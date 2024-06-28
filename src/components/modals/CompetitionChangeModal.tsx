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
        <IonModal isOpen={isOpen} onDidDismiss={onClose}>
            <IonContent>
                <div>
                    Sind Sie sicher, dass Sie den Zeitraum des Wettbewerbes auf den 01.01.2021 bis 01.02.2021 ändern möchten?
                    Hierbei können bei den bisher eingetragenen Schritten Inkonsistenzen auftreten.
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