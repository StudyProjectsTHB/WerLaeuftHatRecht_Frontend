import {
    IonButton,
    IonContent, IonIcon, IonItem, IonList,
    IonPage, IonPopover,
    IonRouterOutlet, IonSelect, IonSelectOption,
} from '@ionic/react';
import {Redirect, Route, useLocation} from 'react-router-dom';


import {useHistory} from "react-router";

import React, {useEffect, useRef, useState} from "react";
import Greeting from "../../components/Greeting";
import UserCard from "../../components/cards/UserCard";
import CourtCard from "../../components/cards/CourtCard";
import CourtAddModal from "../../components/modals/CourtAddModal";
import CourtChangeModal from "../../components/modals/CourtChangeModal";
import CourtDeleteModal from "../../components/modals/CourtDeleteModal";
import {arrowBack} from "ionicons/icons";
import {checkToken, getToken, getUser} from "../../util/service/loginService";
import {getAllGroups} from "../../util/service/groupService";

const Courts: React.FC = () => {
    const [loading, setLoading] = useState(true);
    const [userAdjective, setUserAdjective] = useState("");
    const [userNoun, setUserNoun] = useState("");
    const [userStepGoal, setUserStepGoal] = useState(0);
    const [group, setGroup] = useState("");
    const [courtsNames, setCourtsNames] = useState<string[]>([]);
    const [courtsIds, setCourtsIds] = useState<number[]>([]);
    const [courtEmployeeCount, setCourtEmployeeCount] = useState<number[]>([])

    const [selectedValue, setSelectedValue] = useState<string | undefined>("Alle Gerichte");
    const [showAddModal, setShowAddModal] = useState(false);
    const [showChangeModal, setShowChangeModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedName, setSelectedName] = useState<string | undefined>("");
    const [selectedId, setSelectedId] = useState<number | undefined>(0);
    const [selectedCourtCount, setSelectedCourtCount] = useState<number | undefined>(0);

    const history = useHistory();
    const location = useLocation();
    const [modalClosed, setModalClosed] = useState<boolean>(false);


    const handleOpenChangeModal = (name:string, courtCount:number, id:number) => {
        setSelectedName(name);
        setSelectedId(id);
        setSelectedCourtCount(courtCount);
        setShowChangeModal(true);
    };

    const handleOpenDeleteModal = (name:string, id:number) => {
        setSelectedName(name);
        setSelectedId(id);
        setShowDeleteModal(true);
    };

    const handleCloseModal = () => {
        setModalClosed(prev => !prev);
    };

    const handleButtonClick = (id:number) => {
        history.push(`/tabs/tab4/User?court=${id}`)
    }

    useEffect(() => {
        if (!checkToken()) {
            // history.push('/login', {direction: 'none'});
            window.location.assign('/login');
        }

        const token = getToken();
        const user = getUser(token);
        if (token && user) {
            setUserAdjective(user.adjective);
            setUserNoun(user.noun);
            setUserStepGoal(user.stepGoal)
            setGroup(user.group.name);
            setLoading(false);

            if (!user.admin) {
                window.location.assign('/tabs/tab1');
            }

            const courts = getAllGroups(token);

            courts.then((data) => {
                setCourtsNames(data.map((court) => court.name));
                setCourtsIds(data.map((court) => court.id));
                setCourtEmployeeCount(data.map((court) => court.numberOfEmployees));
            })
        }
    }, [location, history, modalClosed]);

    return (
        <IonPage>
            <IonContent>
                <Greeting adjective={userAdjective} noun={userNoun} group={group} />

                <div className={"container"}>
                    <button onClick={() => {
                        history.push("/tabs/tab4")
                    }} className={"buttonBack"}>
                        <IonIcon aria-hidden="true" icon={arrowBack}/>
                        <p>Zurück</p>
                    </button>

                    <h1>Manager Bereich - Gerichte</h1>
                    <button onClick={() => setShowAddModal(true)} className={"adminButton plus"}>Neues Gericht hinzufügen</button>

                    <div className={"flex headline"}>
                    <h2>Gerichte</h2>
                    </div>
                    <IonList className={"overflowList"}>
                        {courtsNames.map((name, index) => {
                            return (
                                <CourtCard name={name}
                                           employeeCount={courtEmployeeCount[index]}
                                           onUserClick={() => handleButtonClick(courtsIds[index])}
                                           onChangeClick={() => handleOpenChangeModal(name, courtEmployeeCount[index], courtsIds[index])}
                                           onDeleteClick={() => handleOpenDeleteModal(name, courtsIds[index])}
                                           key={index}
                                />
                            )
                        })}
                    </IonList>


                </div>
            </IonContent>
            <CourtAddModal isOpen={showAddModal} onClose={() => {setShowAddModal(false); handleCloseModal()}}/>
            <CourtChangeModal isOpen={showChangeModal} onClose={() => {setShowChangeModal(false); handleCloseModal()}} name={selectedName} count={selectedCourtCount} id={selectedId}/>
            <CourtDeleteModal isOpen={showDeleteModal} onClose={() => {setShowDeleteModal(false); handleCloseModal()}} name={selectedName} id={selectedId}/>
        </IonPage>
    )
};

export default Courts;