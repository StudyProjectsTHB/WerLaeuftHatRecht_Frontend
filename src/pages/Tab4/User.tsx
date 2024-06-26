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
import UserAddModal from "../../components/modals/UserAddModal";
import UserAdminModal from "../../components/modals/UserAdminModal";
import UserChangeModal from "../../components/modals/UserChangeModal";
import UserDeleteModal from "../../components/modals/UserDeleteModal";

const User: React.FC = () => {
    const [selectedValue, setSelectedValue] = useState<string | undefined>("Alle Gerichte");
    const history = useHistory();
    const location = useLocation();
    const [showAddModal, setShowAddModal] = useState(false);
    const [showAdminModal, setShowAdminModal] = useState(false);
    const [showChangeModal, setShowChangeModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedEmail, setSelectedEmail] = useState<string | undefined>("");

    const handleOpenChangeModal = (email) => {
        setSelectedEmail(email);
        setShowChangeModal(true);
    };

    const handleOpenAdminModal = (email) => {
        setSelectedEmail(email);
        setShowAdminModal(true);
    };

    const handleOpenDeleteModal = (email) => {
        setSelectedEmail(email);
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

                    <h2>Manager Bereich - Nutzende</h2>
                    <IonButton onClick={() => setShowAddModal(true)}>Neue Nutzende hinzufügen</IonButton>

                    <h3>Nutzende</h3>
                    <IonSelect
                        value={selectedValue}
                        placeholder="Select an option"
                        onIonChange={e => setSelectedValue(e.detail.value)}
                    >
                        <IonSelectOption value="Alle Gerichte">Alle Gerichte</IonSelectOption>
                        <IonSelectOption value="OLG Brandenburg">OLG Brandenburg</IonSelectOption>
                        <IonSelectOption value="AG Cottbus">AG Cottbus</IonSelectOption>
                        <IonSelectOption value="LG Potsdam">LG Potsdam</IonSelectOption>

                    </IonSelect>
                    <IonList>
                        <UserCard
                            name="lustiger Luchs"
                            email="test@test.de"
                            onChangeClick={() => handleOpenChangeModal('test@test.de')}
                            onAdminClick={() => handleOpenAdminModal('test@test.de')}
                            onDeleteClick={() => handleOpenDeleteModal('test@test.de')}
                        />
                        <UserCard
                            name="frecher Fuchs"
                            email="test2@test.de"
                            onChangeClick={() => handleOpenChangeModal('test2@test.de')}
                            onAdminClick={() => handleOpenAdminModal('test2@test.de')}
                            onDeleteClick={() => handleOpenDeleteModal('test2@test.de')}
                        />
                        <UserCard
                            name="dummer Dachs"
                            email="realitischer.nachname@brandenburg.de"
                            onChangeClick={() => handleOpenChangeModal('realitischer.nachname@brandenburg.de')}
                            onAdminClick={() => handleOpenAdminModal('realitischer.nachname@brandenburg.de')}
                            onDeleteClick={() => handleOpenDeleteModal('realitischer.nachname@brandenburg.de')}
                        />
                    </IonList>


                </div>
            </IonContent>
            <UserAddModal isOpen={showAddModal} onClose={() => setShowAddModal(false)}/>
            <UserAdminModal isOpen={showAdminModal} onClose={() => setShowAdminModal(false)} email={selectedEmail}/>
            <UserChangeModal isOpen={showChangeModal} onClose={() => setShowChangeModal(false)} email={selectedEmail}/>
            <UserDeleteModal isOpen={showDeleteModal} onClose={() => setShowDeleteModal(false)} email={selectedEmail}/>
        </IonPage>
    )
};

export default User;