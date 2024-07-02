import React, {useState} from 'react';
import {IonModal, IonButton, IonContent, IonHeader, IonToolbar, IonTitle} from '@ionic/react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import './AddStepsModal.css';

const CourtDeleteModal = ({isOpen, onClose, name}) => {
    return (
        <IonModal isOpen={isOpen} onDidDismiss={onClose} className={"heightSet"}>
            <IonContent>
                <div>
                    <h1>Sind Sie sicher, dass Sie das Gericht {name} löschen möchten?</h1>
                    <p>Das hat weitreichende Folgen: alle zugehörige Nutzer werden entfernt und das Gericht kann nicht mehr am Wettbewerb teilnehmen.</p>
                </div>

                <div className={"buttonContainer"}>
                    <button slot="end" onClick={onClose} className={"secondary"}>Abbrechen</button>
                    <button onClick={onClose}>Ja, Gericht löschen</button>
                </div>
            </IonContent>
        </IonModal>
    );
}

export default CourtDeleteModal;