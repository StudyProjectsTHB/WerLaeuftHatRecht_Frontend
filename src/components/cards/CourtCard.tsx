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
import {ellipse, personOutline, settingsOutline, starOutline, trashOutline} from "ionicons/icons";


const CourtCard: React.FC<{name:string, id:number, employeeCount:number}> = ({name, id, employeeCount,onUserClick, onChangeClick, onDeleteClick}) => {
    const history = useHistory();
    const location = useLocation();
    const [selectedValue, setSelectedValue] = useState<string | undefined>("OLG Cottbus");


    return (
        <div className="containerAdmin containerGerichte">
            <img
                src="images/UserIcon.png"
                alt="greeting-icon"
            />
            <div className={"name"}>
                <p>{name}</p>
                <p>Gericht</p>
            </div>
            <div className={"buttonUser"}>
                <button onClick={onUserClick}>
                    <IonIcon aria-hidden="true" icon={personOutline} />
                </button>
                <button onClick={onChangeClick}>
                    <IonIcon aria-hidden="true" icon={settingsOutline} />
                </button>
                <button onClick={onDeleteClick}>
                    <IonIcon aria-hidden="true" icon={trashOutline} />
                </button>
            </div>

        </div>
    )
};

export default CourtCard;