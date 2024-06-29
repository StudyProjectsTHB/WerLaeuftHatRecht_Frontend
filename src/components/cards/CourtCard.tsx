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


const CourtCard: React.FC<{name:string,}> = ({name, onUserClick, onChangeClick, onDeleteClick}) => {
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
            <IonButton onClick={onUserClick}>
                <IonIcon aria-hidden="true" icon={ellipse} />
            </IonButton>
            <IonButton onClick={onChangeClick}>
                <IonIcon aria-hidden="true" icon={ellipse} />
            </IonButton>
            <IonButton onClick={onDeleteClick}>
                <IonIcon aria-hidden="true" icon={ellipse} />
            </IonButton>

        </div>
    )
};

export default CourtCard;