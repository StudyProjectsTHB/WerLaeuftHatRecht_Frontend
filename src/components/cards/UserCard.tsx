import {
    IonButton,
    IonContent, IonIcon,
    IonPage,
    IonRouterOutlet, IonSelect, IonSelectOption,
} from '@ionic/react';
import {Redirect, Route, useLocation} from 'react-router-dom';


import {useHistory} from "react-router";

import React, {useState} from "react";
import Greeting from "../../components/Greeting";
import {ellipse} from "ionicons/icons";


const UserCard: React.FC<{name:string, email:string}> = ({name, email, onChangeClick, onAdminClick, onDeleteClick}) => {
    const history = useHistory();
    const location = useLocation();
    const [selectedValue, setSelectedValue] = useState<string | undefined>("OLG Cottbus");


    return (
        <div className="container">
            <img
                src="images/UserIcon.png"
                alt="greeting-icon"
            />
            <p>{name}</p>
            <p>{email}</p>
            <IonSelect
                value={selectedValue}
                placeholder="Select an option"
                onIonChange={e => setSelectedValue(e.detail.value)}
            >
                <IonSelectOption value="Alle Gerichte">Alle Gerichte</IonSelectOption>
                <IonSelectOption value="OLG Brandenburg">OLG Brandenburg</IonSelectOption>
                <IonSelectOption value="OLG Cottbus">OLG Cottbus</IonSelectOption>
                <IonSelectOption value="LG Potsdam">LG Potsdam</IonSelectOption>

            </IonSelect>
            <IonButton onClick={onChangeClick}>
                <IonIcon aria-hidden="true" icon={ellipse} />
            </IonButton>
            <IonButton onClick={onAdminClick}>
                <IonIcon aria-hidden="true" icon={ellipse} />
            </IonButton>
            <IonButton onClick={onDeleteClick}>
                <IonIcon aria-hidden="true" icon={ellipse} />
            </IonButton>

        </div>
    )
};

export default UserCard;