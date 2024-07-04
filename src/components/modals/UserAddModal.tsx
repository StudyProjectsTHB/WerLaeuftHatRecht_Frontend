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
        <IonModal isOpen={isOpen} onDidDismiss={onClose} className={"heightSet500"}>
            <IonContent>
                <div>
                    <h1>Nutzer hinzufügen</h1>
                </div>
                <div>
                    <p>Email eintragen</p>
                    <input type="email" placeholder="Email eintragen"/>
                </div>
                <div>
                    <p>Gericht eintragen</p>
                    <select
                        value={selectedValue}
                        onChange={e => setSelectedValue(e.target.value)}
                    >
                        <option value="OLG Brandenburg">OLG Brandenburg</option>
                        <option value="AG Cottbus">AG Cottbus</option>
                        <option value="LG Potsdam">LG Potsdam</option>

                    </select>
                </div>

                <div className={"buttonContainer"}>
                        <button slot="end" onClick={onClose} className={"secondary"}>Abbrechen</button>
                        <button onClick={onClose}>Speichern</button>
                    </div>

            </IonContent>
        </IonModal>
    );
}

export default UserAddModal;