import {
    IonApp, IonButton, IonButtons,
    IonContent,
    IonHeader,
    IonPage,
    IonRouterOutlet,
    IonTabBar,
    IonTabButton,
    IonTabs,
    IonTitle,
    IonToolbar
} from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Tab3.css';
import { Redirect, Route } from 'react-router-dom';
import { IonReactRouter } from '@ionic/react-router';

import OwnStatistics from "./Tab3/OwnStatistics";
import AllCourtsStatistics from "./Tab3/AllCourtsStatistics";
import CourtStatistics from "./Tab3/CourtStatistics";
import {useHistory} from "react-router";

const Tab3: React.FC = () => {
    const history = useHistory();
    return (
        <IonPage>
            <IonHeader>
            {/*<IonContent>*/}
                <IonToolbar>
                    <IonTitle>Statistiken</IonTitle>
                    <IonButtons>
                {/*<div>*/}
                        <IonButton onClick={() => history.push('/Tab3/OwnStatistics')}>Eigene</IonButton>
                        <IonButton onClick={() => history.push('/Tab3/CourtStatistics')}>OLG XYZ</IonButton>
                        <IonButton onClick={() => history.push('/Tab3/AllCourtsStatistics')}>Alle Gerichte</IonButton>
                {/*</div>*/}
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <IonRouterOutlet>
                    <Route exact path={ `/Tab3/OwnStatistics` } component={ OwnStatistics } />
                    <Route exact path={ `/Tab3/CourtStatistics` } component={ CourtStatistics } />
                    <Route exact path={ `/Tab3/AllCourtsStatistics` } component={ AllCourtsStatistics } />
                    <Route exact path={ `/Tab3` } render={() => <Redirect to="/Tab3/OwnStatistics" />} />
                </IonRouterOutlet>
            </IonContent>
        </IonPage>
    )
};

export default Tab3;
