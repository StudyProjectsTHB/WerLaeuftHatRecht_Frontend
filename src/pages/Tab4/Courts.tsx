import {
    IonButton,
    IonContent, IonItem, IonList,
    IonPage, IonPopover,
    IonRouterOutlet, IonSelect, IonSelectOption,
} from '@ionic/react';
import {Redirect, Route, useLocation} from 'react-router-dom';


import {useHistory} from "react-router";

import React, {useRef, useState} from "react";
import Greeting from "../../components/Greeting";
import UserCard from "../../components/cards/UserCard";
import CourtCard from "../../components/cards/CourtCard";
import CourtAddModal from "../../components/modals/CourtAddModal";
import CourtChangeModal from "../../components/modals/CourtChangeModal";
import CourtDeleteModal from "../../components/modals/CourtDeleteModal";

const Courts: React.FC = () => {
    const [selectedValue, setSelectedValue] = useState<string | undefined>("Alle Gerichte");
    const history = useHistory();
    const location = useLocation();
    const [showAddModal, setShowAddModal] = useState(false);
    const [showChangeModal, setShowChangeModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedName, setSelectedName] = useState<string | undefined>("");
    const [selectedCourtCount, setSelectedCourtCount] = useState<number | undefined>(0);

    const handleOpenChangeModal = (name, courtCount) => {
        setSelectedName(name);
        setSelectedCourtCount(courtCount);
        setShowChangeModal(true);
    };

    const handleOpenDeleteModal = (name) => {
        setSelectedName(name);
        setShowDeleteModal(true);
    };

    return (
        <IonPage>
            <IonContent>
                <Greeting name={"wilder Esel"}/>

                <div className={"container"}>
                    <IonButton onClick={() => {
                        history.push("/tabs/tab4")
                    }}>Zurück</IonButton>

                    <h2>Manager Bereich - Gerichte</h2>
                    <IonButton onClick={()=> setShowAddModal(true)}>Neues Gericht hinzufügen</IonButton>

                    <h3>Gerichte</h3>

                    <IonList>
                        <CourtCard name={"OLG Potsdam"}
                           onUserClick={() => console.log("Not implemented yet")}
                           onChangeClick={() => handleOpenChangeModal('OLG Potsdam', 3)}
                           onDeleteClick={() => handleOpenDeleteModal('OLG Potsdam')}/>
                        <CourtCard name={"AG Cottbus"}
                           onUserClick={() => console.log("Not implemented yet")}
                           onChangeClick={() => handleOpenChangeModal('AG Cottbus', 743)}
                           onDeleteClick={() => handleOpenDeleteModal('AG Cottbus')}/>
                        <CourtCard name={"LG Brandenburg"}
                           onUserClick={() => console.log("Not implemented yet")}
                           onChangeClick={() => handleOpenChangeModal('LG Brandenburg', 27)}
                           onDeleteClick={() => handleOpenDeleteModal('LG Brandenburg')}/>
                    </IonList>


                </div>
            </IonContent>
            <CourtAddModal isOpen={showAddModal} onClose={() => setShowAddModal(false)}/>
            <CourtChangeModal isOpen={showChangeModal} onClose={() => setShowChangeModal(false)} name={selectedName} count={selectedCourtCount}/>
            <CourtDeleteModal isOpen={showDeleteModal} onClose={() => setShowDeleteModal(false)} name={selectedName}/>
        </IonPage>
    )
};

export default Courts;