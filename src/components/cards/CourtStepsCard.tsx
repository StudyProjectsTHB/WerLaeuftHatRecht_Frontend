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


const CourtStepsCard: React.FC<{name:string, steps:number}> = ({name, steps}) => {
    const history = useHistory();
    const location = useLocation();

    return (
        <div className="container">
            <img
                src="images/UserIcon.png"
                alt="greeting-icon"
            />
            <p>{name}</p>
            <p>{steps} Schritte</p>
        </div>
    )
};

export default CourtStepsCard;