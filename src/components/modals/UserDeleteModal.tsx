import React, {useState} from 'react';
import {IonModal, IonButton, IonContent, IonHeader, IonToolbar, IonTitle} from '@ionic/react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import './AddStepsModal.css';

const CourtDeleteModal = ({isOpen, onClose, email}) => {
    return (
        <IonModal isOpen={isOpen} onDidDismiss={onClose} className={"heightSet"}>
            <IonContent>
                <div>
                    <h1>Sind Sie sicher, dass Sie den Nutzenden {email} löschen möchten?</h1>
                    <p>Dadurch verliert der Nutzende alle Berechtigungen und seinen Zugang zum Schrittzählerwettbewerb.</p>
                </div>

                <div className={"buttonContainer"}>
                    <button slot="end" onClick={onClose} className={"secondary"}>Abbrechen</button>
                    <button onClick={onClose}>Ja, Nutzenden löschen</button>
                </div>
            </IonContent>
        </IonModal>
    );
}

export default CourtDeleteModal;