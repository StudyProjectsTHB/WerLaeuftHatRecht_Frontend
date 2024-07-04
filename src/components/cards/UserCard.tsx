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
import {ellipse, settingsOutline, star, starOutline, trashOutline} from "ionicons/icons";


const UserCard: React.FC<{name:string, email:string}> = ({name, email, onChangeClick, onAdminClick, onDeleteClick}) => {
    const history = useHistory();
    const location = useLocation();
    const [selectedValue, setSelectedValue] = useState<string | undefined>("OLG Cottbus");


    return (
        <div className="containerAdmin">
            <img
                src="images/UserIcon.png"
                alt="greeting-icon"
            />
            <div className={"name"}>
                <p>{name}</p>
                <p>{email}</p>
            </div>
            <select
                value={selectedValue}
                onChange={e => setSelectedValue(e.target.value)}
            >
                <option value="Alle Gerichte">Alle Gerichte</option>
                <option value="OLG Brandenburg">OLG Brandenburg</option>
                <option value="OLG Cottbus">OLG Cottbus</option>
                <option value="LG Potsdam">LG Potsdam</option>

            </select>
            <div className={"buttonUser"}>
                <button onClick={onChangeClick}>
                    <IonIcon aria-hidden="true" icon={settingsOutline} />
                </button>
                <button onClick={onAdminClick} className={"adminChange"}>
                    <IonIcon aria-hidden="true" icon={starOutline} />
                </button>
                <button onClick={onDeleteClick}>
                    <IonIcon aria-hidden="true" icon={trashOutline} />
                </button>
            </div>
        </div>
    )
};

export default UserCard;