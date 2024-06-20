import {
    IonButton,
    IonContent,
    IonPage,
    IonRouterOutlet,
} from '@ionic/react';
import './Tab3.css';
import { Redirect, Route } from 'react-router-dom';

import OwnStatistics from "./Tab3/OwnStatistics";
import AllCourtsStatistics from "./Tab3/AllCourtsStatistics";
import CourtStatistics from "./Tab3/CourtStatistics";
import {useHistory} from "react-router";

const Tab3: React.FC = () => {
    const history = useHistory();
    return (
        <IonPage>
            <IonContent>
                <div className={"NavStats"}>
                    <h1>Statistiken</h1>
                    <div className={"buttonContainer"}>
                        <button className={"secondary"} onClick={() => history.push('/Tab3/OwnStatistics')}>Eigene
                        </button>
                        <button className={"secondary"} onClick={() => history.push('/Tab3/CourtStatistics')}>OLG XYZ
                        </button>
                        <button className={"secondary"} onClick={() => history.push('/Tab3/AllCourtsStatistics')}>Alle
                            Gerichte
                        </button>
                    </div>
                </div>

                <IonRouterOutlet>
                    <Route exact path={`/Tab3/OwnStatistics`} component={OwnStatistics}/>
                    <Route exact path={`/Tab3/CourtStatistics`} component={CourtStatistics}/>
                    <Route exact path={`/Tab3/AllCourtsStatistics`} component={AllCourtsStatistics}/>
                    <Route exact path={`/Tab3`} render={() => <Redirect to="/Tab3/OwnStatistics"/>}/>
                </IonRouterOutlet>
            </IonContent>
        </IonPage>
    )
};

export default Tab3;
