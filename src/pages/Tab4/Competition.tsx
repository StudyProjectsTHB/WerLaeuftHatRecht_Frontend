import {
    IonButton,
    IonContent,
    IonPage,
    IonRouterOutlet,
} from '@ionic/react';
import {Redirect, Route, useLocation} from 'react-router-dom';


import {useHistory} from "react-router";

import React, {useState} from "react";
import Greeting from "../../components/Greeting";
import DatePicker from "react-datepicker";
import CompetitionChangeModal from "../../components/modals/CompetitionChangeModal";


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
                    <IonButton onClick={() => {
                        history.push("/tabs/tab4")
                    }}>Zurück</IonButton>
                    <h2>Manager Bereich - Wettbewerb - Einstellungen</h2>
                    <div className={"modalFlex"}>
                        <label>Zeitraum:</label>
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
                        <IonButton onClick={()=>setShowChangeModal(true)}>
                            Speichern
                        </IonButton>
                    </div>
                </div>
            </IonContent>
            <CompetitionChangeModal isOpen={showChangeModal} onClose={() => setShowChangeModal(false)} />
        </IonPage>
    )
};

export default Competition;