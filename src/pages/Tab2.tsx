import {IonContent, IonPage, IonToast} from '@ionic/react';
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

    const [message, setMessage] = useState<string | null>(null);
    const [toastColor, setToastColor] = useState<string | null>(null);
    const [showToast, setShowToast] = useState(false);


    const location = useLocation()
    const history = useHistory();

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


                const step_days = getStepDays(token);

                step_days.then((data) => {
                    setStepDays(data.map((day) => day.date));
                    setStepSteps(data.map((day) => day.steps));
                }).catch((error) => {
                    if (error instanceof TypeError) {
                        setMessage('Schritte konnten nicht geladen werden');
                    } else {
                        setMessage(error.message);
                    }
                    setToastColor('#CD7070');
                    setShowToast(true);
                });
            }
        }
        fetchData();
    }, [location, showModal]);

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        if (params.get("showModal")) {
            setShowModal(true);
        } else {
            setShowModal(false);
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

    const handleCloseModal = (stepsAdded: boolean) => {
        setShowModal(false);
        const params = new URLSearchParams(location.search);
        params.delete("showModal");
        history.replace({search: params.toString()});
        if (stepsAdded) {
            setMessage('Schritte hinzugefügt');
            setToastColor('#68964C');
            setShowToast(true);
        }
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
                <Greeting adjective={userAdjective} noun={userNoun} group={group}/>
                <h1>Editieren</h1>
                <div className={"gridEdit"}>
                    <CalenderProgressBar value={selectedSteps} maxValue={userStepGoal}
                                         onClick={() => setShowModal(true)}/>
                    <Calender steps={stepSteps} days={stepDays} stepGoal={userStepGoal} onDateClick={handleDateClick}/>
                </div>

            </IonContent>
            <StepsAddModal isOpen={showModal} onClose={handleCloseModal} date={selectedDate}/>
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
    );
};

export default Tab2;
