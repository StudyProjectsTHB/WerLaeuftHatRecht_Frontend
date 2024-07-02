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
                    <h1>{email} zum Admin machen?</h1>
                    <p>Administratoren können die Details aller Nutzer bearbeiten, den Wettbewerb verwalten, Gerichte löschen und andere Nutzer zum Administrator machen.
                        Bitte bestätigen Sie nur, wenn der Nutzende ({email}) die Berechtigungen hierfür erhalten soll!</p>
                </div>

                <div className={"buttonContainer"}>
                    <button slot="end" onClick={onClose} className={"secondary"}>Abbrechen</button>
                    <button onClick={onClose}>Ja, zum Admin machen </button>
                </div>
            </IonContent>
        </IonModal>
    );
}

export default CourtDeleteModal;