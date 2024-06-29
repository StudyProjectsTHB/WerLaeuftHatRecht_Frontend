import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Tab2.css';

import Calender from '../components/Calender';
import CalenderProgressBar from "../components/charts/CalenderProgressBar";
import AddStepsModal from "../components/modals/AddStepsModal";
import {useEffect, useState} from "react";
import Greeting from "../components/Greeting";

const Tab2: React.FC = () => {
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        if (params.get("showModal")) {
            setShowModal(true);
        }
    }, [location]);

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

  return (
    <IonPage className={"PageModal Edit"} style={{marginBottom: "65px"}}>
      <IonContent fullscreen className={"EditClass"}>
        <Greeting name={"wilder Esel"}/>
          <div className={"flex"}>
            <CalenderProgressBar value={8000} maxValue={10000} onClick={() => setShowModal(true)}/>
            <Calender/>
          </div>

      </IonContent>
        <AddStepsModal isOpen={showModal} onClose={() => setShowModal(false)} />
    </IonPage>
  );
};

export default Tab2;
