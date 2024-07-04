import React, {useState} from 'react';
import {IonModal, IonButton, IonContent, IonHeader, IonToolbar, IonTitle} from '@ionic/react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import './AddStepsModal.css';

const CourtChangeModal = ({isOpen, onClose, name, count}) => {
    return (
        <IonModal isOpen={isOpen} onDidDismiss={onClose} className={"heightSet500"}>
            <IonContent>
                <h1>Gericht bearbeiten</h1>
                <div>
                    <div>
                        <p>Namen bearbeiten</p>
                    </div>
                    <div className={"modalFlex"}>
                        <input type="text" defaultValue={name} placeholder="Namen eintragen"/>
                    </div>
                </div>
                <div>
                    <div>
                        <p>Mitarbeiteranzahl bearbeiten</p>
                    </div>
                    <div className={"modalFlex"}>
                        <input type="number" defaultValue={count} placeholder="Mitarbeiteranzahl eintragen"/>
                    </div>
                </div>

                <div className={"buttonContainer"}>
                    <button slot="end" onClick={onClose} className={"secondary"}>Abbrechen</button>
                    <button onClick={onClose}>Speichern</button>
                </div>
            </IonContent>
        </IonModal>
    );
}

export default CourtChangeModal;