import {
    IonButton,
    IonContent, IonIcon,
    IonPage,
    IonRouterOutlet,
} from '@ionic/react';
import {Redirect, Route, useLocation} from 'react-router-dom';


import {useHistory} from "react-router";

import React, {useEffect, useRef, useState} from "react";
import Greeting from "../../components/Greeting";
import DatePicker from "react-datepicker";
import CompetitionChangeModal from "../../components/modals/CompetitionChangeModal";
import {arrowBack} from "ionicons/icons";
import {checkToken, getToken, getUser} from "../../util/service/loginService";
import {getCompetition} from "../../util/api/competitionApi";
import de from 'date-fns/locale/de';
import { registerLocale, setDefaultLocale } from 'react-datepicker';


const Competition: React.FC = () => {
    const [loading, setLoading] = useState(true);
    const [userAdjective, setUserAdjective] = useState("");
    const [userNoun, setUserNoun] = useState("");
    const [userStepGoal, setUserStepGoal] = useState(0);
    const [group, setGroup] = useState("");

    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [showChangeModal, setShowChangeModal] = useState(false);
    const datepickerRef = useRef(null);

    const history = useHistory();
    const location = useLocation();

    registerLocale('de', de);
    setDefaultLocale('de');

    const handleDateChange = (dates:[Date, Date]):void => {
        const [start, end] = dates;
        setStartDate(start);
        setEndDate(end);
    };

    const toggleDatePicker = () => {
        setShowDatePicker(!showDatePicker);
    };

    useEffect(() => {
        const handleOutsideClick = (event) => {
            if (datepickerRef.current && !datepickerRef.current.contains(event.target)) {
                setShowDatePicker(false);
            }
        };

        if (showDatePicker) {
            document.addEventListener('mousedown', handleOutsideClick);
        } else {
            document.removeEventListener('mousedown', handleOutsideClick);
        }

        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        };
    }, [showDatePicker]);

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

            const competition = getCompetition(token);

            competition.then((response) => {
                setStartDate(new Date(response.startDate));
                setEndDate(new Date(response.endDate));
            });
        }
    }, [location, history]);


    return (
        <IonPage>
            <IonContent>
                <Greeting adjective={userAdjective} noun={userNoun} group={group} />

                <div className="container">
                    <button onClick={() => {
                        history.push("/tabs/tab4")
                    }} className={"buttonBack"}>
                        <IonIcon aria-hidden="true" icon={arrowBack}/>
                        <p>Zurück</p>
                    </button>

                    <h1>Manager Bereich - Wettbewerb - Einstellungen</h1>
                    <div className={"adminButton time"}>
                        <div className={"name"}>
                            <p>Zeitraum</p>
                        </div>
                        <div className="date-input" onClick={toggleDatePicker}>
                            {startDate && endDate ? `${startDate.toLocaleDateString()} - ${endDate.toLocaleDateString()}` : 'Zeitraum auswählen'}
                        </div>
                        {showDatePicker && (
                            <div className="datepicker-container" ref={datepickerRef}>
                                <DatePicker
                                    selected={startDate}
                                    onChange={handleDateChange}
                                    startDate={startDate}
                                    endDate={endDate}
                                    selectsRange
                                    inline
                                    onCalendarClose={() => setShowDatePicker(false)}
                                    locale={"de"}
                                />
                            </div>
                        )}
                    </div>
                    <IonButton onClick={() => setShowChangeModal(true)} className={"buttonRight"}>
                        Speichern
                    </IonButton>
                </div>
            </IonContent>
            <CompetitionChangeModal isOpen={showChangeModal} onClose={() => setShowChangeModal(false)} startDate={startDate} endDate={endDate} />
        </IonPage>
    )
};

export default Competition;