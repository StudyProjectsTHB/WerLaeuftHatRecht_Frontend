import React, {useState} from 'react';
import { IonModal, IonButton, IonContent, IonHeader, IonToolbar, IonTitle } from '@ionic/react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import './AddStepsModal.css';

const UserChangeModal = ({ isOpen, onClose, email}) => {
    return (
        <IonModal isOpen={isOpen} onDidDismiss={onClose} className={"heightSet"}>
            <IonContent>
                <div>
                    <h1>Email bearbeiten</h1>
                </div>
                <div className={"modalFlex"}>
                    <input type="email" defaultValue={email} placeholder="Email eintragen" />
                </div>
                <div className={"buttonContainer"}>
                    <button slot="end" onClick={onClose} className={"secondary"}>Abbrechen</button>
                    <button onClick={onClose}>Speichern</button>
                </div>
            </IonContent>
        </IonModal>
    );
}

export default UserChangeModal;