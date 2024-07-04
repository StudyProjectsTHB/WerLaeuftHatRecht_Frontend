import React, {useState} from 'react';
import {IonModal, IonButton, IonContent, IonHeader, IonToolbar, IonTitle} from '@ionic/react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import './AddStepsModal.css';

const CourtAddModal = ({isOpen, onClose}) => {
    return (
        <IonModal isOpen={isOpen} onDidDismiss={onClose} className={"heightSet500"}>
            <IonContent>
                <h1>Neues Gericht anlegen</h1>
                <div>
                    <div>
                        <p>Namen eingeben</p>
                    </div>
                    <div className={"modalFlex"}>
                        <input type="text" placeholder="Namen eintragen"/>
                    </div>
                </div>
                <div>
                    <div>
                        <p>Mitarbeiteranzahl eingeben</p>
                    </div>
                    <div className={"modalFlex"}>
                        <input type="number" placeholder="Mitarbeiteranzahl eintragen"/>
                    </div>
                </div>

                <div className={"buttonContainer"}>
                    <button slot="end" onClick={onClose} className={"secondary"}>Abbrechen</button>
                    <button onClick={onClose}>Gericht anlegen</button>
                </div>
            </IonContent>
        </IonModal>
    );
}

export default CourtAddModal;