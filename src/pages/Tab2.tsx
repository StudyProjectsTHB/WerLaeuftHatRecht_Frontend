import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Tab2.css';

import Calender from '../components/Calender';
import CalenderProgressBar from "../components/charts/CalenderProgressBar";
import AddStepsModal from "../components/AddStepsModal";
import {useState} from "react";

const Tab2: React.FC = () => {
    const [showModal, setShowModal] = useState(false);
  return (
    <IonPage>
      <IonContent fullscreen>
        <CalenderProgressBar value={8000} maxValue={10000} onClick={() => setShowModal(true)}/>
        <Calender/>

      </IonContent>
        <AddStepsModal isOpen={showModal} onClose={() => setShowModal(false)} />
    </IonPage>
  );
};

export default Tab2;
