import {
    IonButton,
    IonContent, IonIcon,
    IonPage,
    IonRouterOutlet,
} from '@ionic/react';
import {Redirect, Route, useLocation} from 'react-router-dom';


import {useHistory} from "react-router";

import React, {useState} from "react";
import Greeting from "../../components/Greeting";
import DatePicker from "react-datepicker";
import CompetitionChangeModal from "../../components/modals/CompetitionChangeModal";
import {arrowBack} from "ionicons/icons";


const Competition: React.FC = () => {
    const history = useHistory();
    const location = useLocation();
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [showChangeModal, setShowChangeModal] = useState(false);

    const handleDateChange = (dates) => {
        const [start, end] = dates;
        setStartDate(start);
        setEndDate(end);
    };

    const toggleDatePicker = () => {
        setShowDatePicker(!showDatePicker);
    };


    return (
        <IonPage>
            <IonContent>
                <Greeting name={"wilder Esel"}/>

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
                            <div className="datepicker-container">
                                <DatePicker
                                    selected={startDate}
                                    onChange={handleDateChange}
                                    startDate={startDate}
                                    endDate={endDate}
                                    selectsRange
                                    inline
                                    onCalendarClose={() => setShowDatePicker(false)}
                                />
                            </div>
                        )}
                    </div>
                    <IonButton onClick={() => setShowChangeModal(true)} className={"buttonRight"}>
                        Speichern
                    </IonButton>
                </div>
            </IonContent>
            <CompetitionChangeModal isOpen={showChangeModal} onClose={() => setShowChangeModal(false)} />
        </IonPage>
    )
};

export default Competition;