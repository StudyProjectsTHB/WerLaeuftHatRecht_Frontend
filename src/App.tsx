import {Redirect, Route, Switch, useLocation} from 'react-router-dom';
import {
    IonApp,
    IonIcon,
    IonLabel,
    IonRouterOutlet,
    IonTabBar,
    IonTabButton,
    IonTabs,
    setupIonicReact
} from '@ionic/react';
import {IonReactRouter} from '@ionic/react-router';
import {createOutline, ellipse, homeOutline, location, square, statsChartOutline, triangle} from 'ionicons/icons';
import Tab1 from './pages/Tab1';
import Tab2 from './pages/Tab2';
import Tab3 from './pages/Tab3';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

import './theme/main.css';

/**
 * Ionic Dark Mode
 * -----------------------------------------------------
 * For more info, please see:
 * https://ionicframework.com/docs/theming/dark-mode
 */

/* import '@ionic/react/css/palettes/dark.always.css'; */
/* import '@ionic/react/css/palettes/dark.class.css'; */
import '@ionic/react/css/palettes/dark.system.css';

/* Theme variables */
import './theme/variables.css';
import Login from "./pages/Login";
import Tabs from "./Tabs";
import Register from "./pages/Register";
import './theme/desktop.css';
import React, {useEffect, useState} from "react";
import {useHistory} from "react-router";
import {getToken} from "./util/service/loginService";
import {getDaysRemaining} from "./util/service/appService";

setupIonicReact();

const App: React.FC = () => {

    const [motivationMessage, setMotivationMessage] = useState("Gib Vollgas. Du schaffst das!");
    const [daysRemaining, setDaysRemaining] = useState(0);


    // const location = useLocation();
    // const history = useHistory();

    useEffect(() => {
        // Beispielhafte Nutzung eines Effekts
        if (daysRemaining === 0) {
            setMotivationMessage("Ziel erreicht! Gut gemacht!");
        } else{
            setMotivationMessage("Gib Vollgas. Du schaffst das!");
        }
    }, [daysRemaining]);

    useEffect(() => {

        const token = getToken();
        if (token) {

            const updateDaysRemaining = () => {
                getDaysRemaining(token).then((days) => {
                    setDaysRemaining(days);
                });
            };

            updateDaysRemaining();

            const intervalId = setInterval(() => {
                updateDaysRemaining();
            }, 3600000);

            return () => clearInterval(intervalId);
        }

    }, []);




    return (
        <IonApp>
            <IonReactRouter>
                <IonRouterOutlet>
                    <Switch>
                        <Route path="/login" component={Login} exact={true}/>
                        <Route path="/register/:token" component={Register} exact={true}/>
                        <Route path="/tabs" component={Tabs}/>
                        <Route exact path="/" render={() => <Redirect to="/login"/>}/>
                        <Route path="*" render={() => <Redirect to="/login"/>}/>
                    </Switch>
                </IonRouterOutlet>
                <div className={"motivationCounter"} style={{display: 'none'}}>
                    <h2>{daysRemaining} Tage verbleibend</h2>
                    <p>{motivationMessage}</p>
                </div>
            </IonReactRouter>
        </IonApp>
    );
};


export default App;
