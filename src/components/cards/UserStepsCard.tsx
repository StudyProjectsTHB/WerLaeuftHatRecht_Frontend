import {
    IonButton,
    IonContent, IonIcon,
    IonPage,
    IonRouterOutlet, IonSelect, IonSelectOption,
} from '@ionic/react';
import {Redirect, Route, useLocation} from 'react-router-dom';


import {useHistory} from "react-router";

import React, {useState} from "react";

const UserStepsCard: React.FC<{name:string, steps:number, index: number}> = ({name, steps, index}) => {
    const history = useHistory();
    const location = useLocation();

    return (
        <div className="containerAdmin">
            <div className="imageContainerPlace" data-index={index}>
                <img
                    src="images/circle.png"
                    alt="greeting-icon"
                />
            </div>
            <div className="name">
                <p>{name}</p>
                <p>{steps} Schritte</p>
            </div>
        </div>
    );
};

export default UserStepsCard;
