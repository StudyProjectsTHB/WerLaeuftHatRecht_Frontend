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
import UserStepsCard from "../../components/cards/UserStepsCard";
import {arrowBack} from "ionicons/icons";
import {checkToken, getToken, getUser} from "../../util/service/loginService";
import {getAllCourts, getAllStatisticGroups, getAllStatisticGroupUsers} from "../../util/service/statisticsService";


const Statistics: React.FC = () => {
    const [loading, setLoading] = useState(true);
    const [userAdjective, setUserAdjective] = useState("");
    const [userNoun, setUserNoun] = useState("");
    const [userStepGoal, setUserStepGoal] = useState(0);
    const [group, setGroup] = useState("");
    const [courtsNames, setCourtsNames] = useState<string[]>([]);
    const [courtsIds, setCourtsIds] = useState<number[]>([]);
    const [usersOrCourtName, setUsersOrCourtName] = useState<string[]>([]);
    const [usersOrCourtSteps, setUsersOrCourtSteps] = useState<number[]>([]);

    const [selectedSelectCourtName, setSelectedSelectCourtName] = useState<string>("");
    const [selectedSelectCourtId, setSelectedSelectCourtId] = useState<number>(0);
    const [selectedCourtName, setSelectedCourtName] = useState<string | undefined>("Alle Gerichte");
    const [selectedCourtId, setSelectedCourtId] = useState<number | undefined>(-1);

    const history = useHistory();
    const location = useLocation();

    useEffect(() => {
        if (!checkToken()) {
            // history.push('/login', {direction: 'none'});
            window.location.assign('/login');
        }

        const token = getToken();
        const user = getUser();
        if (token && user) {
            setUserAdjective(user.adjective);
            setUserNoun(user.noun);
            setUserStepGoal(user.stepGoal)
            setGroup(user.group.name);
            setLoading(false);

            if (!user.admin) {
                window.location.assign('/tabs/tab1');
            }

            const courts = getAllCourts(token);
            let usersOrCourt;
            if (selectedCourtId != -1) {
                usersOrCourt = getAllStatisticGroupUsers(token, selectedCourtId);
            } else {
                usersOrCourt = getAllStatisticGroups(token);

            }

            courts.then((courts) => {
                setCourtsNames(courts.map(court => court.name));
                setCourtsIds(courts.map(court => court.id));
                setSelectedSelectCourtName(courts[0].name);
                setSelectedSelectCourtId(courts[0].id);
            });

            usersOrCourt.then((usersOrCourt) => {
                setUsersOrCourtName(usersOrCourt[1]);
                setUsersOrCourtSteps(usersOrCourt[0]);
            });
        }
    }, [location, history]);

    const handleChangedCourt = (courtName: string) => {
        console.log(courtsNames, courtsIds, courtName)
        setSelectedCourtName(courtName);
        let courtId;
        if (courtName === "Alle Gerichte") {
            courtId = -1;  // Keine neue Deklaration, sondern Zuweisung
        } else {
            courtId = courtsIds[courtsNames.indexOf(courtName)];  // Keine neue Deklaration, sondern Zuweisung
        }
        setSelectedCourtId(courtId);
        console.log(courtId);

        if (courtId != -1) {
            const usersOrCourt = getAllStatisticGroupUsers(getToken(), courtId);

            usersOrCourt.then((usersOrCourt) => {
                setUsersOrCourtName(usersOrCourt[1]);
                setUsersOrCourtSteps(usersOrCourt[0]);
            });
        } else {
            const usersOrCourt = getAllStatisticGroups(getToken());

            usersOrCourt.then((usersOrCourt) => {
                setUsersOrCourtName(usersOrCourt[1]);
                setUsersOrCourtSteps(usersOrCourt[0]);
            });
        }
    }

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

                    <div className={"flex headline noMargin"}>
                        <h1>Manager Bereich - Statistiken</h1>

                        <div className={"buttonSelect"}>
                            <select
                                {...(selectedCourtName != "Alle Gerichte" ? {className: "select-selected"} : {})}
                                value={selectedSelectCourtName}

                                onChange={e => {
                                    // setSelectedCourtName(e.target.value)
                                    // setSelectedCourtId(courtsIds[courtsNames.indexOf(e.target.value)])
                                    handleChangedCourt(e.target.value)
                                    setSelectedSelectCourtName(e.target.value)
                                }}

                                onClick={() => {
                                    handleChangedCourt(selectedSelectCourtName)
                                }}
                            >
                                {courtsNames.map((court) => <option value={court} key={court}>{court}</option>)}

                            </select>
                            <IonButton
                                {...(selectedCourtName != "Alle Gerichte" ? {className: "buttonNotSelected"} : {})}
                                onClick={() => {
                                // setSelectedCourtName("Alle Gerichte")
                                // setSelectedCourtId(-1)
                                handleChangedCourt("Alle Gerichte")
                            }}>Alle Gerichte</IonButton>
                        </div>
                    </div>
                    <IonList className={"overflowList"}>
        {/*                {users.map((user, index) => (
                            <UserStepsCard key={index} name={user.name} steps={user.steps} index={index + 1} />
                        ))}*/}
                        {usersOrCourtName.map((name, index) => {
                            return <UserStepsCard key={index} name={name} steps={usersOrCourtSteps[index]} index={index + 1} />
                        })}
                    </IonList>

                    <IonButton className={"buttonRight"}>Excel-Datei herunterladen</IonButton>


                </div>
            </IonContent>
        </IonPage>
    )
};

export default Statistics;