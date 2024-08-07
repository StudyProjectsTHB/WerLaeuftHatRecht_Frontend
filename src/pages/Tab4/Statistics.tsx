import {
    IonButton,
    IonContent, IonIcon, IonList,
    IonPage, IonToast,

} from '@ionic/react';
import {useLocation} from 'react-router-dom';


import {useHistory} from "react-router";

import React, {useEffect, useState} from "react";
import Greeting from "../../components/Greeting";
import UserStepsCard from "../../components/cards/UserStepsCard";
import {arrowBack} from "ionicons/icons";
import {checkToken, getToken, getUser} from "../../util/service/loginService";
import {getAllCourts, getAllStatisticGroups, getAllStatisticGroupUsers} from "../../util/service/statisticsService";
import Papa from 'papaparse';


const Statistics: React.FC = () => {
    const [loading, setLoading] = useState(true);
    const [userAdjective, setUserAdjective] = useState("");
    const [userNoun, setUserNoun] = useState("");
    const [userStepGoal, setUserStepGoal] = useState(0);
    const [group, setGroup] = useState("");
    const [courtsNames, setCourtsNames] = useState<string[]>([]);
    const [courtsIds, setCourtsIds] = useState<number[]>([]);
    const [usersOrCourtName, setUsersOrCourtName] = useState<string[]>([]);
    const [usersOrCourtStepsPerUser, setUsersOrCourtStepsPerUser] = useState<number[]>([]);
    const [usersOrCourtSteps, setUsersOrCourtSteps] = useState<number[]>([]);

    const [selectedSelectCourtName, setSelectedSelectCourtName] = useState<string>("");
    const [selectedSelectCourtId, setSelectedSelectCourtId] = useState<number>(0);
    const [selectedCourtName, setSelectedCourtName] = useState<string | undefined>("Alle Gerichte");
    const [selectedCourtId, setSelectedCourtId] = useState<number | undefined>(-1);

    const [message, setMessage] = useState<string | null>(null);
    const [toastColor, setToastColor] = useState<string | null>(null);
    const [showToast, setShowToast] = useState(false);

    const history = useHistory();
    const location = useLocation();

    useEffect(() => {
        const fetchData = async () => {
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
                }).catch((error) => {
                    if (error instanceof TypeError) {
                        setMessage('Gerichte konnten nicht geladen werden');
                    } else {
                        setMessage(error.message);
                    }
                    setToastColor('#CD7070');
                    setShowToast(true);
                });

                usersOrCourt.then((usersOrCourt) => {
                    setUsersOrCourtName(usersOrCourt[1]);
                    setUsersOrCourtStepsPerUser(usersOrCourt[0]);
                    if (selectedCourtId != -1) {
                        setUsersOrCourtSteps([0]);
                    } else {
                        setUsersOrCourtSteps(usersOrCourt[3]);
                    }
                }).catch((error) => {
                    if (error instanceof TypeError) {
                        setMessage('Statistiken konnten nicht geladen werden');
                    } else {
                        setMessage(error.message);
                    }
                    setToastColor('#CD7070');
                    setShowToast(true);
                });
            }
        }
        fetchData();
    }, [location]);

    const handleChangedCourt = (courtName: string) => {
        setSelectedCourtName(courtName);
        let courtId;
        if (courtName === "Alle Gerichte") {
            courtId = -1;
        } else {
            courtId = courtsIds[courtsNames.indexOf(courtName)];
        }
        setSelectedCourtId(courtId);
        if (courtId != -1) {
            const usersOrCourt = getAllStatisticGroupUsers(getToken(), courtId);

            usersOrCourt.then((usersOrCourt) => {
                setUsersOrCourtName(usersOrCourt[1]);
                setUsersOrCourtStepsPerUser(usersOrCourt[0]);
            }).catch((error) => {
                if (error instanceof TypeError) {
                    setMessage('Statistiken konnten nicht geladen werden');
                } else {
                    setMessage(error.message);
                }
                setToastColor('#CD7070');
                setShowToast(true);
            });
        } else {
            const usersOrCourt = getAllStatisticGroups(getToken());

            usersOrCourt.then((usersOrCourt) => {
                setUsersOrCourtName(usersOrCourt[1]);
                setUsersOrCourtStepsPerUser(usersOrCourt[0]);
                if (selectedCourtId != -1) {
                    setUsersOrCourtSteps([0]);
                } else {
                    setUsersOrCourtSteps(usersOrCourt[3]);
                }
            }).catch((error) => {
                if (error instanceof TypeError) {
                    setMessage('Statistiken konnten nicht geladen werden');
                } else {
                    setMessage(error.message);
                }
                setToastColor('#CD7070');
                setShowToast(true);
            });
        }
    }

    const handleDownloadCSV = () => {

        const csvData = selectedCourtId != -1 ?
            usersOrCourtName.map((name, index) => ({
                Name: name,
                Schritte: usersOrCourtStepsPerUser[index]
            })) :
            usersOrCourtName.map((name, index) => ({
                Name: name,
                Schritte: usersOrCourtSteps[index],
                "Schritte pro Mitarbeiter": usersOrCourtStepsPerUser[index],

            }));

        const csv = Papa.unparse(csvData, {delimiter: ";"});
        const blob = new Blob(["\uFEFF" + csv], {type: 'text/csv;charset=utf-8;'});
        const link = document.createElement("a");

        if (link.download !== undefined) {
            const url = URL.createObjectURL(blob);
            link.setAttribute("href", url);
            link.setAttribute("download", `${selectedCourtName} ${selectedCourtId != -1 ? "Nutzende-" : "Gerichte-"}Statistik.csv`);
            link.style.visibility = 'hidden';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    }


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
                                    handleChangedCourt("Alle Gerichte")
                                }}>Alle Gerichte</IonButton>
                        </div>
                    </div>
                    <IonButton className={"buttonRight"} onClick={handleDownloadCSV}>Excel-Datei
                        herunterladen</IonButton>

                    <IonList className={"overflowList zw"}>
                        {usersOrCourtName.map((name, index) => {
                            return <UserStepsCard key={index}
                                                  name={name}
                                                  steps={usersOrCourtStepsPerUser[index]}
                                                  index={index + 1}
                            />
                        })}
                    </IonList>
                </div>
            </IonContent>
            <IonToast
                isOpen={showToast}
                onDidDismiss={() => setShowToast(false)}
                message={message}
                duration={3000}
                className={"loggin-toast"}
                cssClass="toast"
                style={{
                    '--toast-background': toastColor
                }}
            />
        </IonPage>
    )
};

export default Statistics;