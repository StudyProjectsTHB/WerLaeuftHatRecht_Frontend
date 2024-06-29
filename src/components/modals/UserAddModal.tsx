import React, {useState} from 'react';
import {
    IonModal,
    IonButton,
    IonContent,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonSelect,
    IonSelectOption
} from '@ionic/react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import './AddStepsModal.css';

const UserAddModal = ({isOpen, onClose}) => {
    const [selectedValue, setSelectedValue] = useState<string | undefined>("Alle Gerichte");

    return (
        <IonModal isOpen={isOpen} onDidDismiss={onClose}>
            <IonContent>
                <div>
                    Nutzer hinzufügen
                </div>
                <div>
                    Email eintragen
                </div>
                <div className={"modalFlex"}>
                    <input type="email" placeholder="Email eintragen"/>
                </div>
                <IonSelect
                    value={selectedValue}
                    placeholder="Select an option"
                    onIonChange={e => setSelectedValue(e.detail.value)}
                >
                    <IonSelectOption value="OLG Brandenburg">OLG Brandenburg</IonSelectOption>
                    <IonSelectOption value="AG Cottbus">AG Cottbus</IonSelectOption>
                    <IonSelectOption value="LG Potsdam">LG Potsdam</IonSelectOption>

                </IonSelect>
                <div className={"buttonContainer"}>
                    <button slot="end" onClick={onClose} className={"secondary"}>Abbrechen</button>
                    <button onClick={onClose}>Speichern</button>
                </div>

            </IonContent>
        </IonModal>
    );
}

export default UserAddModal;