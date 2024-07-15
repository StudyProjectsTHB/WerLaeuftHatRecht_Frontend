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
import UserAddModal from "../../components/modals/UserAddModal";
import UserAdminModal from "../../components/modals/UserAdminModal";
import UserChangeModal from "../../components/modals/UserChangeModal";
import UserDeleteModal from "../../components/modals/UserDeleteModal";
import {arrowBack, settingsOutline} from "ionicons/icons";
import {checkToken, getToken, getUser} from "../../util/service/loginService";
import {getAllCourts, getAllUsers} from "../../util/service/userService";

const User: React.FC = () => {
    const [loading, setLoading] = useState<boolean>(true);
    const [userAdjective, setUserAdjective] = useState<string>("");
    const [userNoun, setUserNoun] = useState<string>("");
    const [userStepGoal, setUserStepGoal] = useState<number>(0);
    const [group, setGroup] = useState<string>("");
    const [courtsNames, setCourtsNames] = useState<string[]>([]);
    const [courtsIds, setCourtsIds] = useState<number[]>([]);
    const [usersName, setUsersName] = useState<string[]>([]);
    const [usersEmail, setUsersEmail] = useState<string[]>([]);
    const [usersId, setUsersId] = useState<number[]>([]);
    const [usersCourts, setUsersCourts] = useState<string[]>([]);
    const [userCourtsId, setUserCourtsId] = useState<number[]>([]);
    const [userAdmin, setUserAdmin] = useState<boolean[]>([]);

    const [selectedValue, setSelectedValue] = useState<string>("Alle Gerichte");
    const [showAddModal, setShowAddModal] = useState<boolean>(false);
    const [showAdminModal, setShowAdminModal] = useState<boolean>(false);
    const [showChangeModal, setShowChangeModal] = useState<boolean>(false);
    const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
    const [selectedEmail, setSelectedEmail] = useState<string | undefined>("");
    const [selectedId, setSelectedId] = useState<number | undefined>(0);
    const [selectedAdmin, setSelectedAdmin] = useState<boolean | undefined>(false);

    const history = useHistory();
    const location = useLocation();
    const [modalClosed, setModalClosed] = useState<boolean>(false);


    const handleOpenChangeModal = (email, id) => {
        setSelectedEmail(email);
        setSelectedId(id);
        setShowChangeModal(true);
    };

    const handleOpenAdminModal = (email, id, isAdmin) => {
        setSelectedEmail(email);
        setSelectedId(id);
        setSelectedAdmin(isAdmin);
        setShowAdminModal(true);
    };

    const handleOpenDeleteModal = (email, id) => {
        setSelectedEmail(email);
        setSelectedId(id);
        setShowDeleteModal(true);
    };

    const handleCloseModal = () => {
        setModalClosed(prev => !prev);
    };

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const court = params.get('court');
        if (court) {
            setSelectedValue(courtsNames[courtsIds.indexOf(parseInt(court))])
        }
    }, [location.search, courtsNames, courtsIds]);


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

            const users = getAllUsers(token);
            const groups = getAllCourts(token);

            users.then((users) => {
                setUsersName(users.map((user) => user.adjective + " " + user.noun));
                setUsersEmail(users.map((user) => user.email));
                setUsersId(users.map((user) => user.id));
                setUsersCourts(users.map((user) => user.group.name));
                setUserCourtsId(users.map((user) => user.group.id));
                setUserAdmin(users.map((user) => user.admin));
            });

            groups.then((groups) => {
                setCourtsNames(groups.map((group) => group.name));
                setCourtsIds(groups.map((group) => group.id));
            });
        }
    }, [location, history, modalClosed]);


    return (
        <IonPage>
            <IonContent>
                <Greeting adjective={userAdjective} noun={userNoun} group={group}/>

                <div className={"container"}>
                    <button onClick={() => {
                        history.push("/tabs/tab4")
                    }} className={"buttonBack"}>
                        <IonIcon aria-hidden="true" icon={arrowBack}/>
                        <p>Zurück</p>
                    </button>

                    <h1>Manager Bereich - Nutzende</h1>
                    <button onClick={() => setShowAddModal(true)} className={"adminButton plus"}>Neue Nutzende hinzufügen</button>

                    <div className={"flex headline"}>
                        <h2>Nutzende</h2>
                        <select
                            value={selectedValue}
                            onChange={e => setSelectedValue(e.target.value)}
                        >
                            <option value="Alle Gerichte">Alle Gerichte</option>
                            {courtsNames.map((court) => <option value={court} key={court}>{court}</option>)}

                        </select>
                    </div>
                    <IonList>
                        {usersName.map((name, index) => {
                            if (selectedValue === "Alle Gerichte" || usersCourts[index] === selectedValue) {

                                return <UserCard
                                    key={usersEmail[index]}
                                    name={name}
                                    email={usersEmail[index]}
                                    userId={usersId[index]}
                                    group={usersCourts[index]}
                                    groupId={userCourtsId[index]}
                                    isAdmin={userAdmin[index]}
                                    courtNames={courtsNames}
                                    courtIds={courtsIds}
                                    onChangeClick={() => handleOpenChangeModal(usersEmail[index], usersId[index])}
                                    onAdminClick={() => handleOpenAdminModal(usersEmail[index], usersId[index], userAdmin[index])}
                                    onDeleteClick={() => handleOpenDeleteModal(usersEmail[index], usersId[index])}
                                />
                            }
                        })}
                    </IonList>


                </div>
            </IonContent>
            <UserAddModal isOpen={showAddModal} onClose={() => { setShowAddModal(false); handleCloseModal() }} courtsNames={courtsNames} courtsIds={courtsIds}/>
            <UserAdminModal isOpen={showAdminModal} onClose={() => {setShowAdminModal(false); handleCloseModal()} } email={selectedEmail} id={selectedId} isAdmin={selectedAdmin}/>
            <UserChangeModal isOpen={showChangeModal} onClose={() => {setShowChangeModal(false); handleCloseModal()}} email={selectedEmail} id={selectedId}/>
            <UserDeleteModal isOpen={showDeleteModal} onClose={() => {setShowDeleteModal(false); handleCloseModal() }} email={selectedEmail} id={selectedId}/>
        </IonPage>
    )
};

export default User;