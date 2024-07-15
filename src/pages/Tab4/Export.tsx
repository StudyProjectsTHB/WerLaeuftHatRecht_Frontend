import {
    IonButton,
    IonContent, IonIcon, IonPage,

} from '@ionic/react';
import {useLocation} from 'react-router-dom';


import {useHistory} from "react-router";

import React, {useEffect, useState} from "react";
import Greeting from "../../components/Greeting";
import {arrowBack} from "ionicons/icons";
import {checkToken, getToken, getUser} from "../../util/service/loginService";
import {
    getAllCourts
} from "../../util/service/statisticsService";
import Papa from 'papaparse';
import {exportAllCourts, exportAllCourtsUsers, exportCourtUsers} from "../../util/service/exportService";



const Statistics: React.FC = () => {
    const [loading, setLoading] = useState(true);
    const [userAdjective, setUserAdjective] = useState("");
    const [userNoun, setUserNoun] = useState("");
    const [userStepGoal, setUserStepGoal] = useState(0);
    const [group, setGroup] = useState("");
    const [courtsNames, setCourtsNames] = useState<string[]>([]);
    const [courtsIds, setCourtsIds] = useState<number[]>([]);

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

            const courts = getAllCourts(token);

            courts.then((courts) => {
                setCourtsNames(courts.map(court => court.name));
                setCourtsIds(courts.map(court => court.id));
            });
        }
    }, [location, history]);

    const handleDownloadUsersCSV = async () => {
        let users;
        if (selectedCourtId === -1) {
            users = await exportAllCourtsUsers(getToken());
        } else {
            users = await exportCourtUsers(getToken(), selectedCourtId);
        }

        const usersNames = users[1];
        const usersSteps = users[0];

        const csvData = usersNames.map((name, index) => ({
            Name: name,
            Schritte: usersSteps[index]
        }));

        const csv = Papa.unparse(csvData, {delimiter: ";"});
        const blob = new Blob(["\uFEFF" + csv], {type: 'text/csv;charset=utf-8;'});
        console.log(blob);
        const link = document.createElement("a");

        if (link.download !== undefined) {
            const url = URL.createObjectURL(blob);
            link.setAttribute("href", url);
            link.setAttribute("download", `${selectedCourtName} Nutzer-Statistik.csv`);
            link.style.visibility = 'hidden';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }


    }

    const handleDownloadCourtsCSV = async () => {

        const courts = await exportAllCourts(getToken());
        const courtsNames = courts[1];
        const courtsStepsPerUser = courts[0];
        const courtsSteps = courts[3];


        const csvData = courtsNames.map((name, index) => ({
            Name: name,
            Schritte: courtsSteps[index],
            "Schritte pro Nutzer": courtsStepsPerUser[index],

        }));
        const csv = Papa.unparse(csvData, {delimiter: ";"});
        const blob = new Blob(["\uFEFF" + csv], {type: 'text/csv;charset=utf-8;'});
        console.log(blob);
        const link = document.createElement("a");

        if (link.download !== undefined) {
            const url = URL.createObjectURL(blob);
            link.setAttribute("href", url);
            link.setAttribute("download", `Alle Gerichte Gerichte-Statistik.csv`);
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

                    <h1>Manager Bereich - Export</h1>
                    <div className={"adminButton export2"}>
                        <div className={"name"}>
                            <p>Rangliste</p>
                        </div>
                        <div className={"buttonSelect"}>
                            <select
                                value={selectedCourtName}
                                onChange={e => {
                                    setSelectedCourtName(e.target.value)
                                    e.target.value === "Alle Gerichte" ? setSelectedCourtId(-1) : setSelectedCourtId(courtsIds[courtsNames.indexOf(e.target.value)])
                                    // handleChangedCourt(e.target.value)
                                    // setSelectedSelectCourtName(e.target.value)
                                }}
                            >
                                <option value="Alle Gerichte" key={"Alle Gerichte"}>Alle Gerichte</option>
                                {courtsNames.map((court) => <option value={court} key={court}>{court}</option>)}
                            </select>
                            <IonButton onClick={handleDownloadUsersCSV}>
                                Excel-Datei herunterladen
                            </IonButton>
                        </div>
                    </div>
                    <div className={"adminButton export2"}>
                        <div className={"name"}>
                            <p>Rangliste aller Gerichte</p>
                        </div>
                        <div className={"buttonSelect"}>
                            <IonButton onClick={handleDownloadCourtsCSV}>
                                Excel-Datei herunterladen
                            </IonButton>
                        </div>
                    </div>
                </div>
            </IonContent>
        </IonPage>
    )
};

export default Statistics;