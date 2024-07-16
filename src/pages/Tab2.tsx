import { IonContent, IonPage } from '@ionic/react';
import './Tab2.css';

import Calender from '../components/Calendar';
import CalenderProgressBar from "../components/charts/CalendarProgressBar";
import StepsAddModal from "../components/modals/StepsAddModal";
import React, {useEffect, useState} from "react";
import Greeting from "../components/Greeting";
import {useLocation} from "react-router-dom";
import {useHistory} from "react-router";
import {checkToken, getToken, getUser} from "../util/service/loginService";
import {getStepDays} from "../util/service/addStepsService";

const Tab2: React.FC = () => {
    const [loading, setLoading] = useState<boolean>(true);
    const [userAdjective, setUserAdjective] = useState<string>("");
    const [userNoun, setUserNoun] = useState<string>("");
    const [userStepGoal, setUserStepGoal] = useState<number>(0);
    const [group, setGroup] = useState<string>("");
    const [stepDays, setStepDays] = useState<string[]>([]);
    const [stepSteps, setStepSteps] = useState<number[]>([]);

    const [showModal, setShowModal] = useState(false);
    const [selectedDate, setSelectedDate] = useState<string>("");
    const [selectedSteps, setSelectedSteps] = useState<number>(0);


    const location = useLocation()
    const history = useHistory();

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

            const step_days = getStepDays(token);

            step_days.then((data) => {
                setStepDays(data.map((day) => day.date));
                setStepSteps(data.map((day) => day.steps));
            })

        }
    }, [location, showModal]);

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        if (params.get("showModal")) {
            setShowModal(true);
        } else {
            setShowModal(false); // Falls showModal nicht in der URL ist, Modal schließen
        }
    }, [location.search]);

    useEffect(() => {
        const ionPage = document.querySelector(".PageModal");
        if (ionPage) {
            if (showModal) {
                document.body.classList.add("openModal");
            } else {
                document.body.classList.remove("openModal");
            }
        }
    }, [showModal]);

    const handleCloseModal = () => {
        setShowModal(false);
        const params = new URLSearchParams(location.search);
        params.delete("showModal");
        history.replace({ search: params.toString() });
    };

    const handleDateClick = (date: string) => {
        setSelectedDate(date);
        const index = stepDays.indexOf(date);
        if (index > -1) {
            setSelectedSteps(stepSteps[index]);
        } else {
            setSelectedSteps(0);
        }
    };


    return (
    <IonPage className={"PageModal Edit"} style={{marginBottom: "65px"}}>
      <IonContent fullscreen className={"EditClass"}>
        <Greeting adjective={userAdjective} noun={userNoun} group={group} />
          <h1>Editieren</h1>
          <div className={"gridEdit"}>
            <CalenderProgressBar value={selectedSteps} maxValue={userStepGoal} onClick={() => setShowModal(true)}/>
            <Calender steps={stepSteps} days={stepDays} stepGoal={userStepGoal} onDateClick={handleDateClick}/>
          </div>

      </IonContent>
        <StepsAddModal isOpen={showModal} onClose={handleCloseModal} date={selectedDate} />
    </IonPage>
  );
};

export default Tab2;
